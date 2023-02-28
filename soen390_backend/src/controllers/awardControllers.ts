import { Award, award_schema } from "../models/Award";
import { storeAward, deleteAwardWithId, retrieveAwards } from "../services/awardServices";

export async function createAward(
    name: string,
    description: string,
    timestamp: string,
    ownerID: string) {
    try {
        let newAward: Award = award_schema.cast({
            name, description, timestamp, ownerID
        });
        let award = await storeAward(newAward);
        if (award !== null) {
            return [200, award];
        }
        else {
            return [404, { msg: "Award not stored" }];
        }
    } catch (err: any) {
        throw err;
    }
}
export async function deleteAward(awardID: string) {
    let award = await deleteAwardWithId(awardID);
    if (award === null) {
        return [404, { msg: "Award not found" }];
    }
    let castedAward: Award = await award_schema.cast(award);

    if (award !== null) {
        return [200, castedAward];
    } else {
        return [404, { msg: "Award not found" }];
    }
}
export async function getAwards(userID: string) {
    let awards = await retrieveAwards(userID);
    console.log(awards);
    if (awards !== null) {
        return [200, awards];
    } else {
        return [404, { msg: "Awards not found" }];
    }
}