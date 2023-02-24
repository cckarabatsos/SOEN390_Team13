import firebase from "firebase";
//import { string } from "yup";
import "firebase/storage";
import { Skill, /*skill_schema*/ } from "../models/Skill";

const db = firebase.firestore();

export const findSkillWithID = async (skillID: string) => {
    try {
        var snapShot = await db.collection("skills").doc(skillID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
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
export const deleteSkillWithId = async (skillID: string) => {
    try {
        var data: any = await findSkillWithID(skillID);
        if (data !== undefined) {
            db.collection("skills")
                .doc(skillID)
                .delete()
                .then(() => {
                    console.log(
                        "Skill with ID " +
                        skillID +
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