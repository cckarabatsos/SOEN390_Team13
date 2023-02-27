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
export async function getFilteredJobPostings(filter: Filter) {
    let stripped_filer = filter_schema.cast(filter, {
        stripUnknown: true,
    });
    let [err, error_data] = validateFilterData(stripped_filer);
    if (err) {
        return [400, error_data];
    } else {
        let products = await filterJobPostings(stripped_filer);
        // parse_links(products);
        return [200, products];
    }
}
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
