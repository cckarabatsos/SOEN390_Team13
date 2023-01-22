import { findUserWithID } from "../services/userServices";

export async function getUserWithID(user_id: number) {
    let user = await findUserWithID(user_id);
    if (user) {
        return [200, user];
    } else {
        return [404, { msg: "User not found" }];
    }
}
