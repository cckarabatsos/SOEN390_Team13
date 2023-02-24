import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Skill, /*skill_schema*/ } from "../models/Skill";

const db = firebase.firestore();

export const storeSkill = async (skill: Skill) => {
    try {
        var document = await db.collection("jobpostings").add({
            name: skill.name,
            ownerId: skill.ownerID
        });
        await document.update({ skillID: document.id });
        console.log("Skill successfully stored with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};