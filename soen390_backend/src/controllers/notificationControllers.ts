/**
 * Controller methods for Notification entity of the database
 */
import { retrieveNotifications } from "../services/notificationServices";

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