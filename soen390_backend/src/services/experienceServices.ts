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