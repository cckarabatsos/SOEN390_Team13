/**
 * Service methods for Application entity of the database
 */
import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Application, application_schema } from "../models/Application";
import { jobposting_schema } from "../models/jobPosting";
import { Notification } from "../models/Notification";
import { user_schema } from "../models/User";
import { findJobpostingWithID } from "./jobPostingServices";
import { storeNotification } from "./notificationServices";
import { findUserWithID, updateUser } from "./userServices";

const db = firebase.firestore();

/**
 * Finds application with specified ID in the database
 *
 * @param applicationID
 * @returns snapshot of the found application or undefined
 */
export const findApplicationWithID = async (applicationID: string) => {
  try {
    var snapShot = await db.collection("applications").doc(applicationID).get();
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
    const timestamp = application.schoolEnd.toJSON();
    let user = await findUserWithID(application.ownerID);
    let posting = await findJobpostingWithID(application.postingID);
    console.log("b", application);
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
    }
    if (application.attachResume) {
      application.resume = casted_user.resume;
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
        casted_user.jobpostings.applied[nbrApplications - 1].split(",")[0];
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
      console.log("User specified is not a company. Route not applicable.");
      return null;
    }

    let applicationsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("applications");
    let index: number = casted_user.jobpostings.postingids.indexOf(postingID);
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
    const applications = snapshot.docs.map((doc) => ({
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

    let jobpostingsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("jobpostings");
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
    const postings = postingSnapshot.docs.map((doc) => ({
      ...doc.data(),
      // status: "new status",
    }));

    let applicationsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("applications");
    applicationsRef = applicationsRef.where(
      "applicationID",
      "in",
      applicationIDs
    );

    const snapshot = await applicationsRef.get();
    const applications = snapshot.docs.map((doc) => ({
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
          index = casted_company.jobpostings.postingids.indexOf(postingID);
          let applications =
            casted_company.jobpostings.applied[index].split(",");
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
