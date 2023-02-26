import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Experience, /*experience_schema*/ } from "../models/Experience";

const db = firebase.firestore();

export const findExperienceWithID = async (experienceID: string) => {
    try {
        var snapShot = await db.collection("experiences").doc(experienceID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
export const storeExperience = async (experience: Experience) => {
    try {
        var document = await db.collection("experiences").add({
            atPresent: experience.atPresent,
            startDate: experience.startDate,
            endDate: experience.endDate,
            company: experience.company,
            position: experience.position,
            type: experience.type,
            ownerID: experience.ownerID
        });
        await document.update({ experienceID: document.id });
        console.log("Experience successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};
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
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};
export const retrieveExperiences = async (userID: string, type: string) => {
    let experiencesRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("experiences");

    if (userID) {
        experiencesRef = experiencesRef
            .where("ownerID", "==", userID)
            .where("type", "==", type);
    }
    const snapshot = await experiencesRef.get();
    const experiences = snapshot.docs.map((doc) => ({
        ...doc.data()
    }));
    return experiences;
};