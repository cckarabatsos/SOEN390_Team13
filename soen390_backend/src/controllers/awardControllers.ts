/**
 * Controller methods for Award entity of the database
 */
import { Award, award_schema } from "../models/Award";
import { storeAward, deleteAwardWithId, retrieveAwards } from "../services/awardServices";

/**
 * Tries to store new Award document in the database
 * 
 * @param name 
 * @param description 
 * @param timestamp 
 * @param ownerID 
 * @returns status and res message
 */
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

/**
 * Tries to delete award with specified ID from the database
 * 
 * @param awardID 
 * @returns status and res message
 */
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

/**
 * Tries to retrieve all awards associated with specified user
 * 
 * @param userID 
 * @returns status and res message
 */
export async function getAwards(userID: string) {
    let awards = await retrieveAwards(userID);
    console.log(awards);
    if (awards !== null) {
        return [200, awards];
    } else {
        return [404, { msg: "Awards not found" }];
    }
}