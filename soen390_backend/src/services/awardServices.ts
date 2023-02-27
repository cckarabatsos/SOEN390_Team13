import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Award, /*skill_schema*/ } from "../models/Award";
import { findUserWithID } from "./userServices";

const db = firebase.firestore();

export const findAwardWithID = async (awardID: string) => {
    try {
        var snapShot = await db.collection("awards").doc(awardID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
export const storeAward = async (award: Award) => {
    try {
        let user = await findAwardWithID(award.ownerID);
        if (user === undefined) {
            return null;
        }

        var document = await db.collection("awards").add({
            name: award.name,
            description: award.description,
            timestamp: award.timestamp,
            ownerID: award.ownerID
        });
        await document.update({ awardID: document.id });
        console.log("Award successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};
export const deleteAwardWithId = async (awardID: string) => {
    try {
        var data: any = await findAwardWithID(awardID);
        if (data !== undefined) {
            db.collection("awards")
                .doc(awardID)
                .delete()
                .then(() => {
                    console.log(
                        "Award with ID " +
                        awardID +
                        " successfully deleted."
                    );
                });
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};
export const retrieveAwards = async (userID: string) => {
    let user = await findUserWithID(userID);
    if (user === undefined) {
        return null;
    }
    let awardsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("awards");

    if (userID) {
        awardsRef = awardsRef.where(
            "ownerID",
            "==",
            userID
        );
    }
    const snapshot = await awardsRef.get();
    const awards = snapshot.docs.map((doc) => ({
        ...doc.data()
    }));
    return awards;
};
