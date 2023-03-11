/**
 * Routes for Award entity of the database
 */
import express, { Request, Response } from "express";
import { deleteAward, createAward, getAwards } from "../controllers/awardControllers";
import { Award } from "../models/Award";
const award = express.Router();
award.use(express.json());

/**
 * Route that stores a new award to database
 */
award.post("/:ownerID", async (req: Request, res: Response) => {
    let ownerID: string = req.params.ownerID;
    let name: string = req.body.name;
    let description: string = req.body.description;
    let timestamp: string = req.body.timestamp;
    try {
        const award: Award = await createAward(name, description, timestamp, ownerID);
        const status: number = award[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                award,
            });
        } else if (status == 400) {
            res.status(400);
            res.json(award[1]);
        } else if (status == 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

/**
 * Route that removes an award from database
 */
award.post("/remove/:docID", async (req: Request, res: Response) => {
    let awardID = req.params.docID;
    try {
        const award: Award = await deleteAward(awardID);
        const status: number = award[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                award
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
 * Route that retrieves all awards associated with a user
 */
award.get("/get/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    try {
        const award: Award = await getAwards(userID);
        const status: number = award[0];
        if (status == 200) {
            res.status(200);
            res.json(award[1]);
        } else if (status == 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

module.exports = award;