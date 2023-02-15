import { jobposting_schema, Jobposting } from "../models/jobPosting";
import {
    deleteJobPostingWithId,
    storeJobPosting,
} from "../services/jobPostingServices";
export async function createJobPosting(
    location: string,
    position: string,
    salary: string,
    company: string,
    contract: string,
    description: string,
    email: string,
    category: string,
    jobPosterID: string
) {
    try {
        let newJobPosting: Jobposting = jobposting_schema.cast({
            location,
            position,
            salary,
            company,
            contract,
            description,
            email,
            category,
            jobPosterID,
        });
        let jobPosting = await storeJobPosting(newJobPosting);
        if (jobPosting) {
            return [200, jobPosterID];
        } else {
            return [404, { msg: "Posting not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
export async function deleteJobPosting(userID: string) {
    let user = await deleteJobPostingWithId(userID);
    let castedJobPosting: Jobposting = await jobposting_schema.cast(user);
    //console.log(user);
    if (user) {
        return [200, castedJobPosting];
    } else {
        return [404, { msg: "User not found" }];
    }
}
