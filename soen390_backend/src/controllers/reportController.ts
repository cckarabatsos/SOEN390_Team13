import { Report, report_schema } from "../models/reports";
import {
    applyVerdict,
    deleteReportById,
    getReports,
    storeReport,
} from "../services/reportService";
/**
 * Create a new report on a certain user
 * (reportedID) with a certain reason
 * @param reportedID
 * @param reason
 * @param reporterID
 * @returns
 */
export async function createNewReport(
    reportedID: string,
    reason: string,
    reporterID: string
) {
    try {
        let newReport: Report = report_schema.validateSync({
            reportedID,
            reason,
            reporterID,
        });
        let reportID = await storeReport(newReport);
        if (reportID) {
            return [200, reportID];
        } else {
            return [404, { msg: "Posting not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
/**
 * Get a batch of reports
 * @returns
 */
export async function getBatchReports() {
    try {
        let data = await getReports();
        if (data) {
            return [200, data];
        } else {
            return [404, { msg: "Posting not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
/**
 * Apply a verdict to a user
 * @param reportID
 * @param reportedID
 * @param banned
 * @returns status of the users
 */
export async function userVerdict(
    reportID: string,
    reportedID: string,
    banned: boolean
) {
    try {
        let data: any = await applyVerdict(reportID, reportedID, banned); // Change to a service for that
        console.log(data);
        if (data && data[0] !== 400) {
            return [200, data];
        } else {
            return [404, { msg: "Report Error" }];
        }
    } catch (err: any) {
        return [400, { msg: err.message }];
    }
}
/**
 * Delete a Report from the db
 * @param reportID
 * @returns
 */
export async function deleteReport(reportID: string) {
    const result = await deleteReportById(reportID);
    if (result) {
        return [200, `Report with ID ${reportID} deleted`];
    } else {
        return [404, { msg: "Report not found" }];
    }
}
