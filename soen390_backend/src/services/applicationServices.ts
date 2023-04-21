/**
 * Service methods for Application entity of the database
 */
import { Application, application_schema } from "../models/Application";
import { jobposting_schema } from "../models/jobPosting";
import { Notification } from "../models/Notification";
import { user_schema } from "../models/User";
import { findJobpostingWithID } from "./jobPostingServices";
import { storeNotification } from "./notificationServices";
import { findUserWithID, updateUser } from "./userServices";
import { db } from "../firebaseconfig";
import firebase from "firebase-admin";

const bucket = firebase.storage().bucket();

/**
 * Finds application with specified ID in the database
 *
 * @param applicationID
 * @returns snapshot of the found application or undefined
 */
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

/**
 * Stores a new Application document in the database
 *
 * @param application
 * @returns ID of the created document or null
 */
export const storeApplication = async (application: Application) => {
    try {
        const timestamp = application.schoolEnd.toLocaleString();
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
            console.log("User has already applied to this job posting.");
            return "alreadyApplied";
        }
        if (application.attachCoverLetter) {
            application.coverLetter = casted_user.coverLetter;
        } else {
            application.coverLetter = "";
        }
        if (application.attachResume) {
            application.resume = casted_user.resume;
        } else {
            application.resume = "";
        }
        var document = await db.collection("applications").add({
            ...application,
            timestamp: timestamp,
        });
        await document.update({ applicationID: document.id });
        console.log("Application successfully stored with id: " + document.id);
        casted_user.jobpostings.applied.push(
            document.id + "," + application.postingID
        );
        updateUser(casted_user, casted_user.userID);
        let index: number = casted_company.jobpostings.postingids.indexOf(
            application.postingID
        );

        casted_company.jobpostings.applied[index] =
            casted_company.jobpostings.applied[index].length === 0
                ? document.id
                : casted_company.jobpostings.applied[index] + "," + document.id;

        updateUser(casted_company, casted_company.userID);
        let companyNotification: Notification = {
            logo: casted_user.picture,
            message:
                casted_user.name +
                " has applied to your job posting '" +
                casted_posting.position +
                "'.",
            timestamp: new Date().toLocaleString(),
            category: "applications",
            ownerID: casted_company.userID,
            relatedEntity: casted_user.userID,
        };

        storeNotification(companyNotification);
        let userNotification: Notification = {
            logo: casted_company.picture,
            message:
                "You have applied to " +
                casted_company.name +
                "'s position '" +
                casted_posting.position +
                "'.",
            timestamp: new Date().toLocaleString(),
            category: "applications",
            ownerID: casted_user.userID,
            relatedEntity: casted_posting.postingID,
        };

        storeNotification(userNotification);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};

/**
 * Retrieves the last application associated with the user having the specified ID
 *
 * @param userID
 * @returns application or null
 */
export const retrieveLastApplication = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (casted_user.isCompany) {
            console.log("User specified is a company. Route not applicable.");
            return null;
        }
        let nbrApplications: number = casted_user.jobpostings.applied.length;
        if (nbrApplications === 0) {
            return {};
        } else {
            let applicationID =
                casted_user.jobpostings.applied[nbrApplications - 1].split(
                    ","
                )[0];
            let application = await findApplicationWithID(applicationID);
            if (application === undefined) {
                console.log("Application not found.");
                return null;
            }

            let casted_application = application_schema.cast(application);
            return casted_application;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Retrieves all applications that the company received for a specific job posting
 *
 * @param userID
 * @param postingID
 * @returns array of applications or null
 */
export const retrieveApplications = async (
    userID: string,
    postingID: string
) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (!casted_user.isCompany) {
            console.log(
                "User specified is not a company. Route not applicable."
            );
            return null;
        }

        let applicationsRef: any = db.collection("applications");
        let index: number =
            casted_user.jobpostings.postingids.indexOf(postingID);
        if (index === -1) {
            console.log("Company not responsible for this job posting.");
            return null;
        }
        applicationsRef = applicationsRef.where(
            "applicationID",
            "in",
            casted_user.jobpostings.applied[index].split(",")
        );

        const snapshot = await applicationsRef.get();
        const applications = snapshot.docs.map((doc: any) => ({
            ...doc.data(),
        }));
        return applications;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Retrieves all job postings to which the user having the specified ID
 * has applied to
 *
 * @param userID
 * @returns array of job postings or null
 */
export const retrieveApplicationHistory = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        if (casted_user.isCompany) {
            console.log("User specified is a company. Route not applicable.");
            return null;
        }

        let jobpostingsRef: any = db.collection("jobpostings");
        let jobPostingIDs: string[] = [];
        let applicationIDs: string[] = [];
        casted_user.jobpostings.applied.forEach((str: string) => {
            applicationIDs.push(str.split(",")[0]);
            jobPostingIDs.push(str.split(",")[1]);
        });
        if (jobPostingIDs.length === 0) {
            return [];
        }
        jobpostingsRef = jobpostingsRef.where("postingID", "in", jobPostingIDs);

        const postingSnapshot = await jobpostingsRef.get();
        const postings = postingSnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            // status: "new status",
        }));

        let applicationsRef: any = db.collection("applications");
        applicationsRef = applicationsRef.where(
            "applicationID",
            "in",
            applicationIDs
        );

        const snapshot = await applicationsRef.get();
        const applications = snapshot.docs.map((doc: any) => ({
            ...doc.data(),
        }));
        let counter: number = 0;
        postings.forEach((posting: any) => {
            posting.status =
                applications !== undefined
                    ? applications[counter].status
                    : "Status Error";
            counter++;
        });

        return postings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Deletes application of the user to the specified job posting
 *
 * @param userID
 * @param postingID
 * @returns "Success" or null
 */
export const deleteApplicationWithId = async (
    userID: string,
    postingID: string
) => {
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
        await db
            .collection("applications")
            .where("ownerID", "==", userID)
            .where("postingID", "==", postingID)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data = doc.data();
                    index =
                        casted_company.jobpostings.postingids.indexOf(
                            postingID
                        );
                    let applications =
                        casted_company.jobpostings.applied[index].split(",");
                    applications.splice(
                        applications.indexOf(data.applicationID),
                        1
                    );
                    casted_company.jobpostings.applied[index] =
                        applications.toString();
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

/**
 * Updates the status of the application in the database
 *
 * @param applicationID
 * @param newStatus
 * @returns updated application or null
 */
export async function updateApplication(
    applicationID: string,
    newStatus: string
) {
    try {
        let application = await findApplicationWithID(applicationID);
        if (application === undefined) {
            console.log("Application not found.");
            return null;
        }
        application.status = newStatus;
        db.collection("applications").doc(applicationID).update(application);

        return application;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Stores an aapplication file
 *
 * @param applicationID
 * @param file
 * @returns download URL of uploaded file or null
 */
export const storeApplicationFile = async (
    applicationID: string,
    type: string,
    file: any
) => {
    try {
        let application = await findApplicationWithID(applicationID);
        if (!file || application === undefined) {
            console.log("first check");
            return null;
        }

        if (application) {
            const buffer = Buffer.from(file.buffer);
            const metadata = {
                contentType: file.mimetype,
            };
            let folder: string;
            if (Array.isArray(type)) {
                type = type[0];
            }
            console.log(type);
            if (type.toUpperCase() == "RESUME") {
                folder = "ApplicationDocuments/Resumes/";
            } else if (type.toUpperCase() == "COVERLETTER") {
                folder = "ApplicationDocuments/Cover Letters/";
            } else {
                console.log("second check");
                return null;
            }
            console.log();
            const fileName = folder + applicationID + " - " + file.originalname;
            const fileRef = bucket.file(fileName);
            await fileRef.save(buffer, {
                metadata,
                public: true,
            });
            const downloadURL = await fileRef.publicUrl();
            if (downloadURL) {
                if (type.toUpperCase() == "RESUME") {
                    application.resume = downloadURL;
                } else {
                    application.coverLetter = downloadURL;
                }
                db.collection("applications").doc(applicationID).update(application);
                return downloadURL;
            }
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};

/**
 * Removes specified application file
 *
 * @param applicationID
 * @param type
 * @returns "Success" or null
 */
export const deleteApplicationFile = async (applicationID: string, type: string) => {
    try {
        var application: any = await findApplicationWithID(applicationID);
        if (application === undefined) {
            return null;
        }
        if (application) {
            let url: string;
            if (Array.isArray(type)) {
                type = type[0];
            }
            if (type.toUpperCase() == "RESUME") {
                url = application.resume;
                application.resume = "";
            } else if (type.toUpperCase() == "COVERLETTER") {
                url = application.coverLetter;
                application.coverLetter = "";
            } else {
                return null;
            }
            const parsedUrl = new URL(url);
            var filePath = decodeURIComponent(parsedUrl.pathname).replace(
                /^\//,
                ""
            ); // Remove leading slash
            var temp: string[] = filePath.split("/");
            filePath = "";
            for (var i = 1; i < temp.length; i++) {
                filePath = i == temp.length - 1 ? filePath + temp[i] : filePath + temp[i] + "/";
            }
            const fileRef = bucket.file(filePath);
            await fileRef.delete().then(function () {
                db.collection("applications").doc(applicationID).update(application);
                console.log("File successfully deleted.");
            });
            return "Success";
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};
