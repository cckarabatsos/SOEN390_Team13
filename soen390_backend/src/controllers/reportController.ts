import { Report, report_schema } from "../models/reports";
import {
    applyVerdict,
    getReports,
    storeReport,
} from "../services/reportService";

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
export async function userVerdict(
    reportID: string,
    reportedID: string,
    banned: boolean
) {
    try {
        let data: any = await applyVerdict(reportID, reportedID, banned); // Change to a service for that
        if (data) {
            return [200, data];
        } else {
            return [404, { msg: "Posting not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
