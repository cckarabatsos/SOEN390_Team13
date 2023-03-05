import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Application, /*application_schema*/ } from "../models/Application";
import { jobposting_schema } from "../models/jobPosting";
import { user_schema } from "../models/User";
import { findJobpostingWithID } from "./jobPostingServices";
import { findUserWithID, updateUser } from "./userServices";

const db = firebase.firestore();

export const findApplicationWithID = async (applicationID: string) => {
    try {
        var snapShot = await db
            .collection("applications")
            .doc(applicationID)
            .get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
export const storeApplication = async (application: Application) => {
    try {
        let user = await findUserWithID(application.ownerID);
        let posting = await findJobpostingWithID(application.postingID);
        if (user === undefined || posting === undefined) {
            console.log("User of posting not found.");
            return null;
        }
        let casted_posting = await jobposting_schema.cast(posting);
        let company = await findUserWithID(casted_posting.jobPosterID);
        if (company === undefined) {
            console.log("Company not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        let casted_company = await user_schema.cast(company);
        let jobPostingIDs: string[] = [];
        casted_user.jobpostings.applied.forEach((str: string) => {
            jobPostingIDs.push(str.split(",")[1]);
        });
        if (jobPostingIDs.includes(application.postingID)) {
            console.log("User has already applied to this job posting.")
            return "alreadyApplied";
        }
        if (application.attachCoverLetter) {
            application.coverLetter = casted_user.coverLetter;
        }
        if (application.attachResume) {
            application.resume = casted_user.resume;
        }
        var document = await db.collection("applications").add({
            ...application,
        });
        await document.update({ applicationID: document.id });
        console.log("Application successfully stored with id: " + document.id);
        casted_user.jobpostings.applied.push(document.id + "," + application.postingID);
        updateUser(casted_user, casted_user.userID);
        let index: number = casted_company.jobpostings.postingids.indexOf(application.postingID);
        casted_company.jobpostings.applied[index] = casted_company.jobpostings.applied[index].length === 0 ?
            document.id :
            casted_company.jobpostings.applied[index] + "," + document.id;
        updateUser(casted_company, casted_company.userID);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};

export const retrieveLastApplication = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (casted_user.isCompany) {
            console.log("User specified is a company. Route not applicable.")
            return null;
        }
        let nbrApplications: number = casted_user.jobpostings.applied.length
        if (nbrApplications === 0) {
            return {};
        } else {
            let applicationID = casted_user.jobpostings.applied[nbrApplications - 1].split(",")[0];
            let application = findApplicationWithID(applicationID);
            if (application === undefined) {
                console.log("Application not found.");
                return null;
            }
            // Need to see why cast_application gives error
            // let casted_application = application_schema.cast(application);
            return application;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const retrieveApplications = async (userID: string, postingID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (!casted_user.isCompany) {
            console.log("User specified is not a company. Route not applicable.")
            return null;
        }

        let applicationsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
            db.collection("applications");
        let index: number = casted_user.jobpostings.postingids.indexOf(postingID);
        if (index === -1) {
            console.log("Company not responsible for this job posting.")
            return null;
        }
        applicationsRef = applicationsRef
            .where("applicationID", "in", casted_user.jobpostings.applied[index].split(","));

        const snapshot = await applicationsRef.get();
        const applications = snapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return applications;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const retrieveApplicationHistory = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (casted_user.isCompany) {
            console.log("User specified is a company. Route not applicable.")
            return null;
        }

        let jobpostingsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
            db.collection("jobpostings");
        let jobPostingIDs: string[] = [];
        casted_user.jobpostings.applied.forEach((str: string) => {
            jobPostingIDs.push(str.split(",")[1]);
        });

        jobpostingsRef = jobpostingsRef
            .where("postingID", "in", jobPostingIDs);

        const snapshot = await jobpostingsRef.get();
        const applications = snapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return applications;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteApplicationWithId = async (userID: string, postingID: string) => {
    try {
        let user = await findUserWithID(userID);
        let posting = await findJobpostingWithID(postingID);
        if (user === undefined || posting === undefined) {
            console.log("User or job posting not found.");
            return null;
        }
        let casted_posting = await jobposting_schema.cast(posting);
        let company = await findUserWithID(casted_posting.jobPosterID);
        if (company === undefined) {
            console.log("Company not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        let casted_company = await user_schema.cast(company);

        let counter: number = 0;
        let index: number = -1;
        //let applicationID: string = "";
        casted_user.jobpostings.applied.forEach((str: string) => {
            if (str.split(",")[1] === postingID) {
                index = counter;
            }
            counter++;
        });
        if (index !== -1) {
            casted_user.jobpostings.applied.splice(index, 1);
            updateUser(casted_user, casted_user.userID);
        }
        await db.collection("applications")
            .where("ownerID", "==", userID)
            .where("postingID", "==", postingID)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data = doc.data();
                    index = casted_company.jobpostings.postingids.indexOf(postingID);
                    let applications = casted_company.jobpostings.applied[index].split(",");
                    applications.splice(applications.indexOf(data.applicationID), 1);
                    casted_company.jobpostings.applied[index] = applications.toString();
                    updateUser(casted_company, casted_company.userID);
                    doc.ref.delete();
                });
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return "Success";
};