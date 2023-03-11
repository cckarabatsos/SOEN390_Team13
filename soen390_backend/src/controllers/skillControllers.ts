/**
 * Controller methods for Skill entity of the database
 */
import { Skill, skill_schema } from "../models/Skill";
import { storeSkill, deleteSkillWithId, retrieveSkills } from "../services/skillServices";

/**
 * Tries to store a new Skill document in the database
 * 
 * @param name 
 * @param ownerID 
 * @returns status and res message
 */
export async function createSkill(name: string, ownerID: string) {
    try {
        let newSkill: Skill = skill_schema.cast({
            name, ownerID
        });
        let skill = await storeSkill(newSkill);
        if (skill === "limit") {
            return [400, { msg: "Already at maximum number of skills allowed." }];
        } else if (skill !== null) {
            return [200, skill];
        }
        else {
            return [404, { msg: "Skill not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}

/**
 * Tries to delete skill with specified ID from the database
 * 
 * @param skillID 
 * @returns status and res message
 */
export async function deleteSkill(skillID: string) {
    let skill = await deleteSkillWithId(skillID);
    if (skill === null) {
        return [404, { msg: "Skill not found" }];
    }
    let castedSkill: Skill = await skill_schema.cast(skill);

    if (skill !== null) {
        return [200, castedSkill];
    } else {
        return [404, { msg: "Skill not found" }];
    }
}

/**
 * Tries to retrieve all skills associated with specified user
 * 
 * @param userID 
 * @returns status and res message
 */
export async function getSkills(userID: string) {
    let skills = await retrieveSkills(userID);
    console.log(skills);
    if (skills !== null) {
        return [200, skills];
    } else {
        return [404, { msg: "Skills not found" }];
    }
}