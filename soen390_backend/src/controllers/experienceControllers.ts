import { Experience, experience_schema } from "../models/Experience";
import {
    storeExperience,
    deleteExperienceWithId,
    retrieveExperiences
} from "../services/experienceServices";

export async function createExperience(
    atPresent: boolean,
    startDate: string,
    endDate: string,
    company: string,
    position: string,
    type: string,
    ownerID: string
) {
    try {
        let newExperience: Experience = experience_schema.cast({
            atPresent, startDate, endDate, company, position, type, ownerID
        });
        let experience = await storeExperience(newExperience);
        if (experience !== null) {
            return [200, experience];
        }
        else {
            return [404, { msg: "Experience not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
export async function deleteExperience(experienceID: string) {
    let experience = await deleteExperienceWithId(experienceID);
    if (experience === null) {
        return [404, { msg: "Experience not found" }];
    }
    let castedExperience: Experience = await experience_schema.cast(experience);

    if (experience !== null) {
        return [200, castedExperience];
    } else {
        return [404, { msg: "Experience not found" }];
    }
}
export async function getExperiences(userID: string, type: string) {
    let experiences = await retrieveExperiences(userID, type);

    if (experiences !== null) {
        return [200, experiences];
    } else {
        return [404, { msg: "Experiences of type \"" + type + "\" not found" }];
    }
}