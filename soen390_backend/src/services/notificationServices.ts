/**
 * Service methods for Notification entity of the database
 */
// import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
// import { Notification, notification_schema } from "../models/Notification";
// import { jobposting_schema } from "../models/jobPosting";
import { user_schema } from "../models/User";
// import { findJobpostingWithID } from "./jobPostingServices";
import { findUserWithID } from "./userServices";

// const db = firebase.firestore();

/**
 * Retrieves all notifications of a specific user
 * 
 * @param userID 
 * @returns array of notifications or null
 */
export const retrieveNotifications = async (userID: string) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);

        return casted_user.notifications;
    } catch (error) {
        console.log(error);
        throw error;
    }
};