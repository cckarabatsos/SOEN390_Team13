import {
    jobposting_schema,
    Jobposting,
    filter_schema,
    Filter,
} from "../models/jobPosting";
import {
    deleteJobPostingWithId,
    filterJobPostings,
    storeJobPosting,
} from "../services/jobPostingServices";
import { updateCompanyPostings } from "../services/userServices";
/**
 * Create a job posting from a certain company
 * @param email
 * @param location
 * @param position
 * @param salary
 * @param company
 * @param description
 * @param remote
 * @param contract
 * @param duration
 * @param type
 * @param jobPosterID
 * @returns postingID
 */
export async function createJobPosting(
    email: string,
    location: string,
    position: string,
    salary: string,
    company: string,
    description: string,
    remote: boolean,
    contract: boolean,
    duration: any,
    type: any,
    jobPosterID: string
) {
    try {
        let newJobPosting: Jobposting = jobposting_schema.validateSync({
            email,
            location,
            position,
            salary,
            company,
            description,
            remote,
            contract,
            duration,
            type,
            jobPosterID,
        });
        let postingID = await storeJobPosting(newJobPosting);
        updateCompanyPostings(postingID, jobPosterID);
        if (postingID) {
            return [200, postingID];
        } else {
            return [404, { msg: "Posting not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
/**
 * Deletes a jobPostingID with a certain safety feature making sure that the
 * jobPosting comes from the good company
 * @param jobPostingID
 * @param email
 * @returns
 */
export async function deleteJobPosting(jobPostingID: string, email: string) {
    let jobPosting = await deleteJobPostingWithId(jobPostingID, email);
    let castedJobPosting: Jobposting = await jobposting_schema.cast(jobPosting);
    //console.log(user);
    if (jobPosting) {
        return [200, castedJobPosting];
    } else {
        return [404, { msg: "Job posting not found" }];
    }
}
/**
 * Get a couple of jobPostings via a Filter
 * @param filter
 * @returns
 */
export async function getFilteredJobPostings(filter: Filter) {
    let strippedJobFilter = filter_schema.validateSync(filter, {
        stripUnknown: true,
    });
    console.log(strippedJobFilter);
    let [err, error_data] = validateFilterData(strippedJobFilter);
    if (err) {
        return [400, error_data];
    } else {
        let jobPostings = await filterJobPostings(strippedJobFilter);
        // parse_links(products);
        return [200, jobPostings];
    }
}
/**
 * Validate the jobPosting filter
 * @param filter
 * @returns
 */
function validateFilterData(filter: Filter) {
    let error_data: any = { errMsg: "", errType: "" };
    try {
        filter_schema.validateSync(filter);
    } catch (err: any) {
        error_data.errType = err.name;
        error_data.errMsg = err.errors;
        return [true, error_data];
    }
    return [false, {}];
}
