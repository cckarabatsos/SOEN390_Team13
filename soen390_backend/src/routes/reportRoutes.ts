import express, { Request, Response } from "express";

import {
    createNewReport,
    getBatchReports,
} from "../controllers/reportController";
import { getUserWithID } from "../controllers/userControllers";
import { User } from "../models/User";

const reports = express.Router();
reports.use(express.json());
reports.post("/newReport", async (req: Request, res: Response) => {
    try {
        const reportedID: string = req.body.reportedID;
        const reason: string = req.body.reason;
        const reporterID: string = req.body.reporterID;
        const data: any = await createNewReport(reportedID, reason, reporterID);
        if (data[0] == 200) {
            res.status(data[0]);
            res.json(data[1]);
        } else {
            res.status(data[0]);
            res.json(data[1]);
        }
    } catch (err: any) {
        console.log(err);
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

reports.get("/batchReports", async (req: Request, res: Response) => {
    try {
        const userID: string = req.query.userID as string;
        const user: User = await getUserWithID(userID);
        console.log(user[1].isAdmin);
        if (user[1].isAdmin) {
            const data: any = await getBatchReports();
            if (data[0] == 200) {
                res.status(data[0]);
                res.json(data[1]);
            } else {
                res.status(data[0]);
                res.json(data[1]);
            }
        } else {
            throw new Error("User is not an admin");
        }
    } catch (err: any) {
        console.log(err);
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

module.exports = reports;
