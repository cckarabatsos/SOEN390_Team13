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
        if (experience) {
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
    let experience = await deleteExperience(experienceID);
    let castedExperience: Experience = await experience_schema.cast(experience);

    if (experience) {
        return [200, castedExperience];
    } else {
        return [404, { msg: "Experience not found" }];
    }
}