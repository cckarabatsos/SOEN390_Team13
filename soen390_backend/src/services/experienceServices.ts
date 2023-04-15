/**
 * Service methods for Experience entity of the database
 */

import firebase from "firebase-admin";
import { Experience /*experience_schema*/ } from "../models/Experience";
import { findUserWithID } from "./userServices";

import { db } from "../firebaseconfig";
const bucket = firebase.storage().bucket();

/**
 * Finds experience with specified ID in the database
 *
 * @param experienceID
 * @returns snapshot of the found experience or undefined
 */
export const findExperienceWithID = async (experienceID: string) => {
    try {
        var snapShot = await db
            .collection("experiences")
            .doc(experienceID)
            .get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
/**
 * Stores a new Experience document in the database
 *
 * @param experience
 * @returns ID of the created document or null
 */
export const storeExperience = async (experience: Experience) => {
    try {
        let user = await findUserWithID(experience.ownerID);
        if (
            user === undefined ||
            (experience.type !== "Education" && experience.type !== "Work")
        ) {
            return null;
        }

        experience.logo =
            experience.type === "Education"
                ? bucket.file("Logos/education_logo.png").publicUrl()
                : bucket.file("Logos/experience_logo.jpg").publicUrl();
        var document = await db.collection("experiences").add({
            atPresent: experience.atPresent,
            startDate: experience.startDate,
            endDate: experience.endDate,
            company: experience.company,
            position: experience.position,
            type: experience.type,
            logo: experience.logo,
            ownerID: experience.ownerID,
        });
        await document.update({ experienceID: document.id });
        // console.log("Experience successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};

/**
 * Deletes experience with specified ID from the database
 *
 * @param experienceID
 * @returns information of the deleted experience or null
 */
export const deleteExperienceWithId = async (experienceID: string) => {
    try {
        var data: any = await findExperienceWithID(experienceID);
        if (data !== undefined) {
            db.collection("experiences")
                .doc(experienceID)
                .delete()
                .then(() => {
                    console.log(
                        "Experience with ID " +
                        experienceID +
                        " successfully deleted."
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
 * Retrieves all experiences of specified type that are associated with the
 * user having the specified ID
 *
 * @param userID
 * @param type "Work" or "Education"
 * @returns array of experiences or null
 */
export const retrieveExperiences = async (userID: string, type: string) => {
    let user = await findUserWithID(userID);
    if (user === undefined || (type !== "Education" && type !== "Work")) {
        return null;
    }
    let experiencesRef = db
        .collection("experiences")
        .where("ownerID", "==", userID)
        .where("type", "==", type);

    const snapshot = await experiencesRef.get();
    const experiences = snapshot.docs.map((doc) => ({
        ...doc.data(),
    }));
    return experiences;
};
