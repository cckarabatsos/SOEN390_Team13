/**
 * Service methods for Experience entity of the database
 */
import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Experience /*experience_schema*/ } from "../models/Experience";
import { findUserWithID } from "./userServices";

const db = firebase.firestore();
const ref = firebase.storage().ref();

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
export const storeExperience = async (experience: Experience, companyID: string) => {
    try {
        let user = await findUserWithID(experience.ownerID);
        if (user === undefined) {
            return null;
        }
        let company = await findUserWithID(companyID);
        if (company === undefined || !company.isCompany) {
            experience.logo = await ref
                .child("Profile Pictures/blank_company_pic.jpg")
                .getDownloadURL();;
        } else {
            experience.logo = company.picture;
        }
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
    let experiencesRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("experiences");

    experiencesRef = experiencesRef
        .where("ownerID", "==", userID)
        .where("type", "==", type);

    const snapshot = await experiencesRef.get();
    const experiences = snapshot.docs.map((doc) => ({
        ...doc.data(),
    }));
    return experiences;
};
