import { findUserWithID } from "../services/userServices";

export async function getUserWithID(userID: string) {
    let user = await findUserWithID(userID);
    console.log(user);
    if (user) {
        return [200, user];
    } else {
        return [404, { msg: "User not found" }];
    }
}
