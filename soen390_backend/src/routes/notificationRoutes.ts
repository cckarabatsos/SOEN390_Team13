/**
 * Routes for Notification entity of the database
 */
import express, { Request, Response } from "express";
import {
    deleteNotification,
    getNotifications,
} from "../controllers/notificationControllers";
import { Notification } from "../models/Notification";
const notification = express.Router();
notification.use(express.json());

/**
 * Route that gets the notifications of a user
 */
notification.get(
    "/getNotifications/:userID",
    async (req: Request, res: Response) => {
        let userID = req.params.userID;
        try {
            const notification: Notification = await getNotifications(userID);
            const status: number = notification[0];
            if (status == 200) {
                res.status(200);
                res.json(notification[1]);
            }
            if (status == 404) {
                res.sendStatus(404);
            }
        } catch (err: any) {
            res.status(400);
            res.json({ errType: err.name, errMsg: err.message });
        }
    }
);

/**
 * Route that removes a notification from database
 */
notification.post("/remove/:docID", async (req: Request, res: Response) => {
    let notificationID = req.params.docID;
    try {
        const notification: Notification = await deleteNotification(
            notificationID
        );
        const status: number = notification[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                notification,
            });
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

export default notification;
