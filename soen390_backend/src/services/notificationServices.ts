/**
 * Service methods for Notification entity of the database
 */
// import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
 import { Notification} from "../models/Notification";
import { user_schema } from "../models/User";
import { findUserWithID, updateUser } from "./userServices";

// const db = firebase.firestore();

/**
 * Stores a new Notification in the database
 * 
 * @param userID
 * @param notification 
 * @returns "Success" or null
 */
export const storeNotification = async (userID: string, notification: Notification) => {
    try {
        let user = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        casted_user.notifications.push(notification);
        updateUser(casted_user, casted_user.userID);
        console.log("Notification stored successfully.");
    } catch (error) {
        console.log(error);
        throw error;
    }
    return "Success";
};

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

        var notificationList:Notification = []

        for(var i =0; i<casted_user.notifications.length; i++) {

            let aNotification = await casted_user.notifications[i].get()
            notificationList.push(aNotification.data())
        }
        return notificationList;
    } catch (error) {
        console.log(error);
        throw error;
    }
};