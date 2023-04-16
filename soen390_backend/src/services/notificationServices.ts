/**
 * Service methods for Notification entity of the database
 */
import firebase from "firebase-admin";
import { Notification, notification_schema } from "../models/Notification";
import { user_schema } from "../models/User";
import { findUserWithID } from "./userServices";

import { db } from "../firebaseconfig";

/**
 * Finds notification with specified ID in the database
 *
 * @param notificationID
 * @returns snapshot of the found notification or undefined
 */
export const findNotificationWithID = async (notificationID: string) => {
    try {
        var snapShot = await db
            .collection("notifications")
            .doc(notificationID)
            .get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};

/**
 * Stores a new Notification in the database
 *
 * @param notification
 * @returns notification ID or null
 */
export const storeNotification = async (notification: Notification) => {
    try {
        let user = await findUserWithID(notification.ownerID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_user = await user_schema.cast(user);
        var document = await db.collection("notifications").add({
            ...notification,
        });
        await document.update({ notificationID: document.id });
        console.log("Notification successfully stored with id: " + document.id);

        await db
            .collection("users")
            .doc(casted_user.userID)
            .update({
                notifications: firebase.firestore.FieldValue.arrayUnion(
                    db.doc("notifications/" + document.id)
                ),
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
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

        let userRef = db.collection("users").doc(userID);

        //removed unused notifications from the reffernce array
        for (let i = 0; i < casted_user.notifications.length; i++) {
            let notifDocRef = await casted_user.notifications[i].get();
            if (!notifDocRef.data()) {
                await userRef.update({
                    notifications: firebase.firestore.FieldValue.arrayRemove(
                        casted_user.notifications[i]
                    ),
                });
            }
        }

        let userRefresh = await findUserWithID(userID);
        if (user === undefined) {
            console.log("User not found.");
            return null;
        }
        let casted_userRefresh = await user_schema.cast(userRefresh);

        var notifications: Notification[] = [];

        var promise = new Promise<void>((resolve) => {
            casted_userRefresh.notifications.forEach(
                async (notifRef: any, index: any, array: any) => {
                    let snapShot: any = await notifRef.get();
                    let notif: Notification = await notification_schema.cast(
                        snapShot.data()
                    );
                    notifications.push(notif);
                    if (index === array.length - 1) resolve();
                }
            );
        });
        await promise;
        notifications.reverse();
        // console.log(notifications);
        return notifications;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Deletes notification with specified ID from the database
 *
 * @param notificationID
 * @returns information of the deleted notification or null
 */
export const deleteNotificationWithId = async (notificationID: string) => {
    try {
        var data: any = await findNotificationWithID(notificationID);
        if (data !== undefined) {
            db.collection("notifications")
                .doc(notificationID)
                .delete()
                .then(async () => {
                    console.log(
                        "Notification with ID " +
                        notificationID +
                        " successfully deleted."
                    );
                    let casted_notification = notification_schema.cast(data);
                    let user = await findUserWithID(
                        casted_notification.ownerID
                    );
                    if (user !== undefined) {
                        user.notifications.splice(
                            user.notifications.indexOf(
                                "notifications/" + notificationID
                            ),
                            1
                        );
                    }
                });
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};
