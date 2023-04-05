/**
 * Service methods for Award entity of the database
 */

import { Award /*skill_schema*/ } from "../models/Award";
import { findUserWithID } from "./userServices";
import { db } from "../firebaseconfig";

/**
 * Finds award with specified ID in the database
 *
 * @param awardID
 * @returns snapshot of the found award or undefined
 */
export const findAwardWithID = async (awardID: string) => {
    try {
        var snapShot = await db.collection("awards").doc(awardID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};

/**
 * Stores a new Award document in the database
 *
 * @param award
 * @returns ID of the created document or null
 */
export const storeAward = async (award: Award) => {
    try {
        let user = await findUserWithID(award.ownerID);
        if (user === undefined) {
            return null;
        }

        var document = await db.collection("awards").add({
            name: award.name,
            description: award.description,
            timestamp: award.timestamp,
            ownerID: award.ownerID,
        });
        await document.update({ awardID: document.id });
        console.log("Award successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};

/**
 * Deletes award with specified ID from the database
 *
 * @param awardID
 * @returns information of the deleted award or null
 */
export const deleteAwardWithId = async (awardID: string) => {
    try {
        var data: any = await findAwardWithID(awardID);
        if (data !== undefined) {
            db.collection("awards")
                .doc(awardID)
                .delete()
                .then(() => {
                    console.log(
                        "Award with ID " + awardID + " successfully deleted."
                    );
                });
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};

/**
 * Retrieves all awards that are associated with the user having the specified ID
 *
 * @param userID
 * @returns array of awards or null
 */
export const retrieveAwards = async (userID: string) => {
    let user = await findUserWithID(userID);
    if (user === undefined) {
        return null;
    }
    let awardsRef: any = db.collection("awards");

    if (userID) {
        awardsRef = awardsRef.where("ownerID", "==", userID);
    }
    const snapshot = await awardsRef.get();
    const awards = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
    }));
    return awards;
};
