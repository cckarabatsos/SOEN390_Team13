import express, { Request, Response } from "express";
import {
    deleteJobPosting,
    getFilteredJobPostings,
    getJobSuggestions,
} from "../controllers/jobPostingControllers";
import { Jobposting } from "../models/jobPosting";
const jobposting = express.Router();
jobposting.use(express.json());
/**
 * Route that removes a certain job posting (postID) with a safety measure that makes sure
 * that it is the right company that removes the postID
 */
jobposting.post("/remove/:email", async (req: Request, res: Response) => {
    let email = req.params.email;
    let postID = req.body.docID;
    try {
        let data = await deleteJobPosting(postID, email);
        if (data[0] == 200) {
            res.sendStatus(200);
        } else if (data[0] == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
/**
 * Route to get back a couple of products
 */
jobposting.get("/filter/products", async (req: Request, res: Response) => {
    var filter: any = {};
    for (const [key, value] of Object.entries(req.query)) {
        filter[key] = value;
    }
    try {
        let status,
            data = await getFilteredJobPostings(filter);
        res.json(data);
        res.status(200);
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

/**
 * Route that gets the job suggestions for a user
 */
jobposting.get(
    "/getJobSuggestions/:userID",
    async (req: Request, res: Response) => {
        let userID = req.params.userID;
        try {
            const application: Jobposting = await getJobSuggestions(
                userID
            );
            const status: number = application[0];
            if (status == 200) {
                res.status(200);
                res.json(application[1]);
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

//Exporting the job postings
module.exports = jobposting;
