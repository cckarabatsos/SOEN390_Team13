import { Application, application_schema } from "../models/Application";
import {
    storeApplication,
    retrieveLastApplication,
    retrieveApplications,
    retrieveApplicationHistory
} from "../services/applicationServices";

export async function createApplication(
    email: boolean,
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
            ownerID
        });
        let application = await storeApplication(newApplication);
        if (application === "alreadyApplied") {
            return [400, { msg: "User has already applied to this job posting." }];
        }
        else if (application !== null) {
            return [200, application];
        }
        else {
            return [404, { msg: "Experience not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
export async function getLastApplication(userID: string) {
    let application: Application = await getLastApplication(userID);

    if (application !== null) {
        return [200, application];
    } else {
        return [404, { msg: "Application not found" }];
    }
}
export async function getApplications(userID: string) {
    let applications = await retrieveApplications(userID);

    if (applications !== null) {
        return [200, applications];
    } else {
        return [404, { msg: "Applications not found" }];
    }
}
export async function getApplicationHistory(userID: string) {
    let jobpostings = await retrieveApplications(userID);

    if (jobpostings !== null) {
        return [200, jobpostings];
    } else {
        return [404, { msg: "Application history not found" }];
    }
}