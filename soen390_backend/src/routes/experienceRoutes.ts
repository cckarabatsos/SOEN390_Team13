import express, { Request, Response } from "express";
import { createExperience, deleteExperience, getExperiences } from "../controllers/experienceControllers";
import { Experience } from "../models/Experience";
const experience = express.Router();
experience.use(express.json());

experience.post("/:ownerID", async (req: Request, res: Response) => {
    let ownerID: string = req.params.ownerID;
    let atPresent: boolean = req.body.atPresent;
    let startDate: string = req.body.startDate;
    let endDate: string = req.body.endDate;
    let company: string = req.body.company;
    let position: string = req.body.position;
    let type: string = req.body.type;
    try {
        const experience: Experience = await createExperience(
            atPresent,
            startDate,
            endDate,
            company,
            position,
            type,
            ownerID);
        const status: number = experience[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                experience
            });
        } else if (status !== 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
experience.post("/remove/:docID", async (req: Request, res: Response) => {
    let experienceID = req.params.docID;
    try {
        let status,
            data = await deleteExperience(experienceID);
        res.json({ data });
        if (status == 200) {
            res.sendStatus(200);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
experience.get("/get/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    let type = req.query.type as string;
    try {
        let status,
            data = await getExperiences(userID, type);
        res.json(data);
        if (status == 200) {
            res.sendStatus(200);
        }
        if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

module.exports = experience;