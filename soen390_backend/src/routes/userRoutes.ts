import express, { Request, Response } from "express";
import { getUserWithID } from "../controllers/userControllers";
const user = express.Router();
user.use(express.json());

//First example route look at postman for the route
user.get("/id/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    console.log(userID);
    try {
        let status,
            data = await getUserWithID(userID);
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

//Exporting the user as a module
module.exports = user;
