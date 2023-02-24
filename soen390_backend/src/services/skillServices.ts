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
        let skills = await retrieveSkills(skill.ownerID);
        if (skills) {
            if (skills.length >= 10) {
                return "limit";
            }
        }

        var document = await db.collection("skills").add({
            name: skill.name,
            ownerID: skill.ownerID
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
export const retrieveSkills = async (userID: string) => {
    let skillsRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("skills");

    if (userID) {
        skillsRef = skillsRef.where(
            "ownerID",
            "==",
            userID
        );
    }
    const snapshot = await skillsRef.get();
    const skills = snapshot.docs.map((doc) => ({
        ...doc.data()
    }));
    return skills;
};
