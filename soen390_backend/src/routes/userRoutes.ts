import express, { Request, Response } from "express";
import { getUserWithID } from "../controllers/userControllers";

const userRouter = express.Router();
userRouter.use(express.json());

//First example route

userRouter.get("id/:user_id", async (req: Request, res: Response) => {
    let user_id = parseInt(req.params.user_id);
    console.log(user_id);
    try {
        let status,
            data = await getUserWithID(user_id);
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

//Exporting the userRouter as a module
module.exports = userRouter;
