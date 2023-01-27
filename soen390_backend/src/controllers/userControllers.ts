import { findUserWithID, findUserWithEmail, storeUser }
    from "../services/userServices";
import type { User } from "../models/User";

export async function getUserWithID(userID: string) {
    let user = await findUserWithID(userID);
    console.log(user);
    if (user) {
        return [200, user];
    } else {
        return [404, { msg: "User not found" }];
    }
}
export async function getUserWithEmail(email: string) {
    return new Promise((resolve, _) => {
        findUserWithEmail(email, (user) => {
            if (user == null) {
                resolve([404, null]);
            } else {
                resolve([200, user]);
            }
        });
    });
}
export async function registerUser(user: User) {
    let registeredUser = await storeUser(user);
    if (registeredUser) {
        return [200, registeredUser];
    } else {
        return [404, { msg: "User not registered." }];
    }
}
//This is to be later updated to have the compare encrypted passwords
export async function comparePasswords(pwd: string, password: string) {
    let match: boolean = password == pwd;
    console.log(match);
    return match;
}
