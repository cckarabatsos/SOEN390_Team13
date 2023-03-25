import { Filter, Jobposting } from "../models/jobPosting";
import firebase from "firebase";
import { findUserWithID } from "./userServices";
import { user_schema } from "../models/User";
import { Notification } from "../models/Notification";
import { storeNotification } from "./notificationServices";
import { retrieveSkills } from "./skillServices";
import { Skill } from "../models/Skill";

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
            ...newJobPosting,
        });
        await document.update({
            postingID: document.id,
            postingDeadline: postingDeadline,
            logo: casted_user.picture,
        });
        console.log("Job posting successfully stored with id: " + document.id);
        let notification: Notification = {
            logo: casted_user.picture,
            message: casted_user.name + " has posted a new job '" + newJobPosting.position + "'.",
            timestamp: (new Date()).toLocaleString(),
            category: "news"
        };
        casted_user.followers.forEach((followerID: string) => {
            storeNotification(followerID, notification);
        });
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

export const retrieveJobSuggestions = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        const skills = await retrieveSkills(userID);
        skills?.forEach((skill: Skill) => {
            skill.name = skill.name.toUpperCase();
        });
        let companyPostingIDs: string[] = [];
        casted_user.follows.forEach(async (str: string) => {
            let company = await findUserWithID(str);
            if (company !== undefined) {
                let casted_company = await user_schema.cast(company);
                casted_company.jobpostings.postingids.forEach((postingID: string) => {
                    companyPostingIDs.push(postingID);
                });
            }
        });

        let postingsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
            db.collection("jobpostings");
        const snapshot = await postingsRef.get();
        const postings = snapshot.docs.map((doc) => ({
            ...doc.data(),
        }));

        let nbrElementsToRemove: number = 0;
        postings.forEach((posting: Jobposting) => {
            let score: number = 0;
            let position: string[] = posting.position.toUpperCase().split(" ");
            let description: string[] = posting.description.toUpperCase().split(" ");
            skills?.forEach((skill: Skill) => {
                position.forEach((str: string) => {
                    str = str.replace(/["'`,.:;-]+/g, "");
                    if (skill.name == str) {
                        score++;
                    }
                });
                description.forEach((str: string) => {
                    str = str.replace(/["'`,.:;-]+/g, "");
                    if (skill.name == str) {
                        score++;
                    }
                });
            });

            if (score == 0 && !companyPostingIDs.includes(posting.postingID)) {
                posting.score = -1;
                nbrElementsToRemove++;
            } else {
                posting.score = score;
            }
        });
        postings.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
        for (let i = 0; i < nbrElementsToRemove; i++) {
            postings.pop();
        }

        return postings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};