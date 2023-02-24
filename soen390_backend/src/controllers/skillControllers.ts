import { Skill, skill_schema } from "../models/Skill";
import { storeSkill, deleteSkillWithId } from "../services/skillServices";

export async function createSkill(name: string, ownerID: string) {
    try {
        let newSkill: Skill = skill_schema.cast({
            name, ownerID
        });
        let skill = await storeSkill(newSkill);
        if (skill) {
            return [200, skill];
        } else {
            return [404, { msg: "Skill not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}