import {
    findUserWithID,
    findUserWithEmail,
    storeUser,
    deleteUserWithId,
} from "../services/userServices";
import { User, user_schema } from "../models/User";

export async function getUserWithID(userID: string) {
    let user = await findUserWithID(userID);
    let casted_user = await user_schema.cast(user);
    // console.log(casted_user);
    if (user) {
        return [200, casted_user];
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
export async function registerUser(user: any) {
    console.log(user);

    let casted_user: User = await user_schema.cast(user, {
        stripUnknown: false,
    });
    console.log(casted_user);
    user = await new Promise((resolve, _) => {
        findUserWithEmail(casted_user.email, (user) => {
            // console.log(user);
            if (user == null) {
                resolve(null);
            } else {
                resolve(user);
            }
        });
    });
    if (user === null) {
        let registeredUser = await storeUser(casted_user);
        if (registeredUser) {
            return [200, registeredUser];
        } else {
            return [404, { msg: "User not registered." }];
        }
    } else {
        return [401, { msg: "Email was already found in the database" }];
    }
}
export async function deleteUser(userID: string) {
    let user = await deleteUserWithId(userID);
    let casted_user = await user_schema.cast(user);
    //console.log(user);
    if (user) {
        return [200, casted_user];
    } else {
        return [404, { msg: "User not found" }];
    }
}
//This is to be later updated to have the compare encrypted passwords
export async function comparePasswords(pwd: string, password: string) {
    let match: boolean = password == pwd;
    // console.log(match);
    return match;
}
export async function editAccount(currProfile: User, newProfile: any) {
    try {
        currProfile.email = newProfile.email;
        currProfile.password = newProfile.password;
        currProfile.bio = newProfile.bio;
        currProfile.currentCompany = newProfile.currentCompany;
        currProfile.currentPosition = newProfile.currentPosition;
        currProfile.name = newProfile.name;
    } catch (err: any) {
        return [400, { msg: "missing field" }];
    }
    return [200, currProfile];
}
