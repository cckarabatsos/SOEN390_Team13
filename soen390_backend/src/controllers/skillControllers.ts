import { Skill, skill_schema } from "../models/Skill";
import { storeSkill, deleteSkillWithId, retrieveSkills } from "../services/skillServices";

export async function createSkill(name: string, ownerID: string) {
    try {
        let newSkill: Skill = skill_schema.cast({
            name, ownerID
        });
        let skill = await storeSkill(newSkill);
        if (skill === "limit") {
            return [400, { msg: "Already at maximum number of skills allowed." }];
        } else if (skill) {
            return [200, skill];
        }
        else {
            return [404, { msg: "Skill not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
export async function deleteSkill(skillID: string) {
    let skill = await deleteSkillWithId(skillID);
    let castedSkill: Skill = await skill_schema.cast(skill);

    if (skill) {
        return [200, castedSkill];
    } else {
        return [404, { msg: "Skill not found" }];
    }
}
export async function getSkills(userID: string) {
    let skills = await retrieveSkills(userID);

    if (skills) {
        return [200, skills];
    } else {
        return [404, { msg: "Skills not found" }];
    }
}