/**
 * Routes for Skill entity of the database
 */
import express, { Request, Response } from "express";
import {
    deleteSkill,
    createSkill,
    getSkills,
} from "../controllers/skillControllers";
import { Skill } from "../models/Skill";
const skill = express.Router();
skill.use(express.json());

/**
 * Route that stores a new skill to database
 */
skill.post("/:ownerID", async (req: Request, res: Response) => {
    let ownerID: string = req.params.ownerID;
    let name: string = req.body.name;
    try {
        const skill: Skill = await createSkill(name, ownerID);
        const status: number = skill[0];
        console.log(status);
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                skill,
            });
        } else if (status == 400) {
            res.status(400);
            res.json(skill[1]);
        } else if (status == 401) {
            res.status(401);
            res.json(skill[1]);
        } else if (status == 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

/**
 * Route that removes a skill from database
 */
skill.post("/remove/:docID", async (req: Request, res: Response) => {
    let skillID = req.params.docID;
    try {
        const skill: Skill = await deleteSkill(skillID);
        const status: number = skill[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                skill,
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
 * ROute that gets skills associated with user from database
 */
skill.get("/get/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    try {
        const skill: Skill = await getSkills(userID);
        const status: number = skill[0];
        if (status == 200) {
            res.status(200);
            res.json(skill[1]);
        } else if (status == 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

export default skill;
