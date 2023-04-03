/**
 * Controller methods for Application entity of the database
 */
import { Application, application_schema } from "../models/Application";
import {
    deleteApplicationWithId,
    findApplicationWithID,
    retrieveApplicationHistory,
    retrieveApplications,
    retrieveLastApplication,
    storeApplication,
    updateApplication,
} from "../services/applicationServices";

/**
 * Tries to store new Application document in the database
 *
 * @param email
 * @param firstName
 * @param lastName
 * @param phone
 * @param address
 * @param address2
 * @param city
 * @param area
 * @param province
 * @param school
 * @param schoolCountry
 * @param schoolDegree
 * @param schoolEnd
 * @param schoolMajor
 * @param timestamp
 * @param postingID
 * @param attachResume
 * @param attachCoverLetter
 * @param experience
 * @param ownerID
 * @returns status and res message
 */
export async function createApplication(
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    address2: string,
    city: string,
    area: string,
    province: string,
    school: string,
    schoolCountry: string,
    schoolDegree: string,
    schoolEnd: string,
    schoolMajor: string,
    timestamp: string,
    postingID: string,
    attachResume: boolean,
    attachCoverLetter: boolean,
    experience: string[],
    ownerID: string
) {
    try {
        const status: string = "pending";
        let newApplication: Application = application_schema.cast({
            email,
            firstName,
            lastName,
            phone,
            address,
            address2,
            city,
            area,
            province,
            status,
            school,
            schoolCountry,
            schoolDegree,
            schoolEnd,
            schoolMajor,
            timestamp,
            postingID,
            attachResume,
            attachCoverLetter,
            experience,
            ownerID,
        });
        let application = await storeApplication(newApplication);
        if (application === "alreadyApplied") {
            return [
                400,
                { msg: "User has already applied to this job posting." },
            ];
        } else if (application !== null) {
            return [200, application];
        } else {
            return [404, { msg: "Experience not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}

/**
 * Tries to retrieve last application associated with specified user
 *
 * @param userID
 * @returns status and res message
 */
export async function getLastApplication(userID: string) {
    let application: Application = await retrieveLastApplication(userID);

    if (application !== null) {
        return [200, application];
    } else {
        return [404, { msg: "Application not found" }];
    }
}

/**
 * Tries to retrieve all applications for specified company and job posting
 *
 * @param userID
 * @param postingID
 * @returns status and res message
 */
export async function getApplications(userID: string, postingID: string) {
    let applications = await retrieveApplications(userID, postingID);

    if (applications !== null) {
        return [200, applications];
    } else {
        return [404, { msg: "Applications not found" }];
    }
}

/**
 * Tries to retrieve all job postings to which the specified user has applied
 *
 * @param userID
 * @returns status and res message
 */
export async function getApplicationHistory(userID: string) {
    let jobpostings = await retrieveApplicationHistory(userID);

    if (jobpostings !== null) {
        return [200, jobpostings];
    } else {
        return [404, { msg: "Application history not found" }];
    }
}

/**
 * Tries to delete application of the specified user to the specified job posting
 *
 * @param userID
 * @param postingID
 * @returns status and res message
 */
export async function deleteApplication(userID: string, postingID: string) {
    let msg = await deleteApplicationWithId(userID, postingID);

    if (msg !== null) {
        return [200, msg];
    } else {
        return [404, { msg: "Experience not found" }];
    }
}

/**
 * Tries to update the status of the specified application
 *
 * @param applicationID
 * @param newStatus
 * @returns status and res message
 */
export async function editApplication(
    applicationID: string,
    newStatus: string
) {
    let application = await updateApplication(applicationID, newStatus);

    if (application !== null) {
        return [200, application];
    } else {
        return [404, { msg: "Experience not found" }];
    }
}
export async function getApplicationWithID(ApplicationID: string) {
    let user = await findApplicationWithID(ApplicationID);
    let casted_user = await application_schema.cast(user);
    // console.log(casted_user);
    if (user) {
        return [200, casted_user];
    } else {
        return [404, { msg: "User not found" }];
    }
}
