import { Filter, Jobposting } from "../models/jobPosting";
import firebase from "firebase";

const db = firebase.firestore();
export const findJobpostingWithID = async (postingID: string) => {
    try {
        var snapShot = await db.collection("jobpostings").doc(postingID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
export const storeJobPosting = async (newJobPosting: Jobposting) => {
    try {
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
            jobPosterID: newJobPosting.jobPosterID,
        });
        await document.update({ postingID: document.id });
        console.log("Job posting successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};
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
            db.collection("jobpostings")
                .doc(postingID)
                .delete()
                .then(() => {
                    console.log(
                        "Job Posting with ID " +
                            postingID +
                            "successfully deleted."
                    );
                });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};
export const filterJobPostings = async (filter: Filter) => {
    let jobPostingsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("jobpostings");

    if (filter.category) {
        const prefix = filter.category;
        const prefixEnd = prefix + "\uf8ff"; // Unicode character that is higher than any other character in a string
        jobPostingsRef = jobPostingsRef
            .where("category", ">=", prefix)
            .where("category", "<", prefixEnd);
    }
    if (filter.limit) {
        jobPostingsRef = jobPostingsRef.limit(filter.limit);
    }
    if (filter.skip) {
        jobPostingsRef = jobPostingsRef.startAfter(filter.skip);
    }

    const snapshot = await jobPostingsRef.get();
    const jobPostings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return jobPostings;
};
