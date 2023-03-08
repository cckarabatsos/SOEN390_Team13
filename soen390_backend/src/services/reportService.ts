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
