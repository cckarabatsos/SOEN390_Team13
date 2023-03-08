import express, { Request, Response } from "express";

import { createNewReport } from "../controllers/reportController";

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

module.exports = reports;
