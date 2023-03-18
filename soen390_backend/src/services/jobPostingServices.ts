import { Filter, Jobposting } from "../models/jobPosting";
import firebase from "firebase";
import { findUserWithID } from "./userServices";
import { user_schema } from "../models/User";

const db = firebase.firestore();
/**
 * Find a certain jobPosting with its id
 * @param postingID
 * @returns A snapshot of the database
 */
export const findJobpostingWithID = async (postingID: string) => {
    try {
        var snapShot = await db.collection("jobpostings").doc(postingID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
/**
 * Store a jobPosting item within the jobPosting database
 * @param newJobPosting
 * @returns document.id
 */
export const storeJobPosting = async (newJobPosting: Jobposting) => {
    try {
        const date = new Date();
        date.setMonth(date.getMonth() + 2);
        var postingDeadline = firebase.firestore.Timestamp.fromDate(date);
        let user = await findUserWithID(newJobPosting.jobPosterID);
        let casted_user = user_schema.cast(user);
        var document = await db.collection("jobpostings").add({
            email: newJobPosting.email,
            location: newJobPosting.location,
            position: newJobPosting.position,
            salary: newJobPosting.salary,
            company: newJobPosting.company,
            description: newJobPosting.description,
            remote: newJobPosting.remote,
            contract: newJobPosting.contract,
            duration: newJobPosting.duration,
            type: newJobPosting.type,
            logo: casted_user.picture,
            jobPosterID: newJobPosting.jobPosterID,
            postingDeadline: postingDeadline,
        });
        await document.update({ postingID: document.id });
        console.log("Job posting successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};
/**
 * Function to delete a certian jobPosting via its id
 * @param postingID
 * @param email
 * @returns
 */
export const deleteJobPostingWithId = async (
    postingID: string,
    email: string
) => {
    try {
        var data: any = await findJobpostingWithID(postingID);
        if (data !== undefined) {
            if (data.email !== email) {
                const error: any = new Error("Not the good company");
                error.code = "401";
                throw error;
            }
            db.collection("jobpostings").doc(postingID).delete();
            const userRef = db.collection("users").doc(data.jobPosterID);
            const userSnapshot = await userRef.get();
            const postingIds =
                userSnapshot.data()?.jobpostings?.postingids ?? [];
            const index = postingIds.indexOf(postingID);
            if (index > -1) {
                const applied = userSnapshot.data()?.jobpostings?.applied ?? [];
                applied.splice(index, 1);
                const documents =
                    userSnapshot.data()?.jobpostings?.documents ?? [];
                documents.splice(index, 1);
                await userRef.update({
                    "jobpostings.postingids":
                        firebase.firestore.FieldValue.arrayRemove(postingID),
                    "jobpostings.applied": applied,
                    "jobpostings.documents": documents,
                });
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};
/**
 * Return a couple of jobPostings via a filter object
 * @param filter
 * @returns
 */

export const filterJobPostings = async (filter: Filter) => {
    let jobPostingsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("jobpostings");

    if (filter.location) {
        const prefix = filter.location.toLowerCase();
        const prefixEnd = prefix + "\uf8ff";
        jobPostingsRef = jobPostingsRef
            .where("location", ">=", prefix)
            .where("location", "<", prefixEnd);
    }
    if (filter.company) {
        const prefix = filter.company;
        const prefixEnd = prefix + "\uf8ff";
        jobPostingsRef = jobPostingsRef
            .where("company", ">=", prefix)
            .where("company", "<", prefixEnd);
        //console.log(jobPostingsRef);
    }
    if (filter.position) {
        const prefix = filter.position.toLowerCase();
        const prefixEnd = prefix + "\uf8ff"; // Unicode character that is higher than any other character in a string
        jobPostingsRef = jobPostingsRef
            .where("position", ">=", prefix)
            .where("position", "<", prefixEnd);
    }

    if (filter.type) {
        const type = filter.type.toLowerCase();
        jobPostingsRef = jobPostingsRef.where("type", "==", type);
    }
    if (filter.remote) {
        const remote = filter.remote;
        jobPostingsRef = jobPostingsRef.where("remote", "==", remote);
    }
    if (filter.limit) {
        jobPostingsRef = jobPostingsRef.limit(filter.limit);
    }
    if (filter.skip > 0) {
        const lastVisible = await jobPostingsRef.get().then((snapshot) => {
            const lastDoc = snapshot.docs[filter.skip - 1];
            return lastDoc;
        });
        jobPostingsRef = jobPostingsRef.startAfter(lastVisible);
    }

    const snapshot = await jobPostingsRef.get();

    const jobPostings: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    const now = new Date().getTime(); // Get the current system time in milliseconds

    const validJobPostings = []; // Initialize an array to hold the valid job postings

    const expiredJobPostings = []; // Initialize an array to hold the expired job postings

    for (let i = 0; i < jobPostings.length; i++) {
        const jobPosting = jobPostings[i];
        const postingDeadline = new Date(jobPosting.postingDeadline).getTime(); // Convert the posting deadline to milliseconds
        if (postingDeadline > now) {
            validJobPostings.push(jobPosting); // Add the job posting to the valid job postings array
        } else {
            expiredJobPostings.push(jobPosting); // Add the job posting to the expired job postings array
        }
    }

    console.log(validJobPostings); // Output the valid job postings
    console.log(expiredJobPostings); // Output the expired job postings

    return jobPostings;
};
