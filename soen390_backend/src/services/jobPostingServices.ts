import { Jobposting } from "../models/jobPosting";
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
            location: newJobPosting.location,
            position: newJobPosting.position,
            salary: newJobPosting.salary,
            company: newJobPosting.company,
            contract: newJobPosting.contract,
            description: newJobPosting.description,
            email: newJobPosting.email,
            category: newJobPosting.category,
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
export const deleteJobPostingWithId = async (postingID: string) => {
    try {
        var data: any = await findJobpostingWithID(postingID);
        if (data !== undefined) {
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
