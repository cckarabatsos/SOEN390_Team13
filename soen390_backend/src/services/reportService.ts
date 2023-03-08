import firebase from "firebase";
import { Report } from "../models/reports";
const db = firebase.firestore();
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
