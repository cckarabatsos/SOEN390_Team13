/**
 * Controller methods for Notification entity of the database
 */
import { notification_schema } from "../models/Notification";
import { deleteNotificationWithId, retrieveNotifications } from "../services/notificationServices";

/**
 * Tries to retrieve all notifications of the specified user
 *
 * @param userID
 * @returns status and res message
 */
export async function getNotifications(userID: string) {
    let notifications = await retrieveNotifications(userID);

    if (notifications !== null) {
        return [200, notifications];
    } else {
        return [404, { msg: "Notifications not found" }];
    }
}

/**
 * Tries to delete notification with specified ID from the database
 * 
 * @param notificationID 
 * @returns status and res message
 */
export async function deleteNotification(notificationID: string) {
    let notification = await deleteNotificationWithId(notificationID);
    if (notification === null) {
        return [404, { msg: "Notification not found" }];
    }
    let castedAward: Notification = await notification_schema.cast(notification);

    if (notification !== null) {
        return [200, castedAward];
    } else {
        return [404, { msg: "Notification not found" }];
    }
}