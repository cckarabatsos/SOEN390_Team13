import firebase from "firebase";
import { Report } from "../models/reports";
const db = firebase.firestore();
/**
 * Function to store a newReport in the database
 * @param newReport
 * @returns document.id
 */
export const storeReport = async (newReport: Report) => {
    try {
        var document = await db.collection("reports").add({
            ...newReport,
        });
        await document.update({ reportID: document.id });
        console.log("Report successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};
/**
 * Function to get A couple of Reports
 * @returns
 */
export const getReports = async () => {
    try {
        const querySnapshot = await db.collection("reports").limit(10).get();
        const reports: any = [];
        querySnapshot.forEach((doc) => {
            reports.push(doc.data());
        });
        return reports;
    } catch (error: any) {
        throw new Error("Error getting reports: " + error.message);
    }
};
/**
 * Apply a certain verdict to a report
 * @param reportID
 * @param reportedID
 * @param banned
 * @returns
 */
export const applyVerdict = async (
    reportID: string,
    reportedID: string,
    banned: boolean
) => {
    try {
        console.log(reportID);
        console.log(reportedID);
        let reportedDocRef = db.collection("users").doc(reportedID);
        let reportDocRef = db.collection("reports").doc(reportID);
        const reportedDoc = await reportedDocRef.get();
        const reportDoc = await reportDocRef.get();

        if (!reportedDoc.exists) {
            throw new Error(`User document with ID ${reportedID} not found`);
        }

        if (!reportDoc.exists) {
            throw new Error(`Report document with ID ${reportID} not found`);
        }
        if (reportDoc.data()?.reportedID !== reportedID) {
            throw new Error(
                `Reported ID ${reportedID} does not match ID in report`
            );
        }
        const batch = db.batch();
        if (banned) {
            const reportingStatus = reportedDoc.data()?.reporting_status;
            console.log(reportingStatus);
            if (reportingStatus === "never_reported") {
                batch.update(reportedDocRef, {
                    reporting_status: "reported_once",
                });
            } else if (reportingStatus === "reported_once") {
                batch.update(reportedDocRef, { reporting_status: "banned" });
                const reportsSnapshot = await db
                    .collection("reports")
                    .where("reportedID", "==", reportedID)
                    .get();
                reportsSnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });
            }
            batch.delete(reportDocRef);
            await batch.commit();
            return [200, "User banned and report deleted"];
        } else {
            batch.delete(reportDocRef);
            await batch.commit();
            return [200, "User not banned but report deleted"];
        }
    } catch (err: any) {
        console.log(err);
        return [400, { msg: err.message }];
    }
};
/**
 * Delete a certain report via its ID
 * @param reportId
 * @returns
 */
export const deleteReportById = async (reportId: string) => {
    try {
        const reportRef = db.collection("reports").doc(reportId);
        const reportDoc = await reportRef.get();

        if (reportDoc.exists) {
            await reportRef.delete();
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error("Error deleting report: " + error.message);
    }
};
