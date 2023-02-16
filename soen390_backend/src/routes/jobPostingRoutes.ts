import express, { Request, Response } from "express";
import { deleteJobPosting } from "../controllers/jobPostingControllers";

const jobposting = express.Router();
jobposting.use(express.json());

jobposting.post("/remove/:docID", async (req: Request, res: Response) => {
    let postID = req.params.docID;
    try {
        let status,
            data = await deleteJobPosting(postID);
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
//Exporting the job postings
module.exports = jobposting;
