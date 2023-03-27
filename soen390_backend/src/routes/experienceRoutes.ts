/**
 * Routes for Experience entity of the database
 */
import express, { Request, Response } from "express";
import {
    createExperience,
    deleteExperience,
    getExperiences,
} from "../controllers/experienceControllers";
import { Experience } from "../models/Experience";
const experience = express.Router();
experience.use(express.json());

/**
 * Route that stores new experience to database
 */
experience.post("/:ownerID", async (req: Request, res: Response) => {
    let ownerID: string = req.params.ownerID;
    let atPresent: boolean = req.body.atPresent;
    let startDate: string = req.body.startDate;
    let endDate: string = req.body.endDate;
    let company: string = req.body.company;
    let position: string = req.body.position;
    let type: string = req.body.type;
    console.log("SSSSSSSSSSSSSSSS")
    console.log(atPresent,
        startDate,
        endDate,
        company,
        position,
        type,
        ownerID)
    try {
        const experience: Experience = await createExperience(
            atPresent,
            startDate,
            endDate,
            company,
            position,
            type,
            ownerID
        );
        const status: number = experience[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                experience,
            });
        } else if (status == 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

/**
 * Route that removes an experience from database
 */
experience.post("/remove/:docID", async (req: Request, res: Response) => {
    let docID = req.params.docID;

    try {
        const experience: Experience = await deleteExperience(docID);
        const status: number = experience[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                experience,
            });
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

/**
 * Route that gets experiences of specified type for a specific user
 */
experience.get("/get/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    let type = req.query.type as string;
    try {
        const experience: Experience = await getExperiences(userID, type);
        const status: number = experience[0];
        if (status == 200) {
            res.status(200);
            res.json(experience[1]);
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
