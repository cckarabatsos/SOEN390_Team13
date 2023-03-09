import {
    findUserWithID,
    findUserWithEmail,
    storeUser,
    deleteUserWithId,
    sendUserInvitation,
    storeAccountFile,
    findAccountFile,
    updateUser,
    manageUserInvitation,
    getUserInvitationsOrContacts,
    getFilteredUsers,
    deleteAccountFile,
    followCompanyInv,
    unFollowCompanyInv,
} from "../services/userServices";
import dotenv from "dotenv";
import {
    User,
    UserFilter,
    user_filter_schema,
    user_schema,
} from "../models/User";
import { hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { sign } = jwt;
const saltRounds = 4;
dotenv.config();
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
    if (user.name === "" || user.email === "") {
        throw new Error("User name cannot be empty");
    }
    let casted_user: User;
    try {
        casted_user = await user_schema.cast(user, {
            stripUnknown: false,
        });
        // console.log(casted_user);
    } catch (error) {
        console.error(error);
        return [404, { msg: "Cast error" }];
    }
    casted_user.password = await hash(casted_user.password, saltRounds);
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
export async function uploadAccountFile(
    userID: string,
    type: string,
    file: any
) {
    let url = await storeAccountFile(userID, type, file);
    console.log("File upload finished.");
    if (url === null) {
        return [404, { msg: "File storage failed." }];
    } else {
        return [200, url];
    }
}
export async function removeAccountFile(userID: string, type: string) {
    let success = await deleteAccountFile(userID, type);
    if (success === null) {
        return [404, { msg: "File retrieval failed." }];
    } else {
        return [200, success];
    }
}
export async function getAccountFile(userID: string, type: string) {
    let downloadUrl = await findAccountFile(userID, type);
    if (downloadUrl === null) {
        return [404, { msg: "File retrieval failed." }];
    } else {
        return [200, downloadUrl];
    }
}
//This is to be later updated to have the compare encrypted passwords
export async function comparePasswords(pwd: string, password: string) {
    let match: boolean = password == pwd;
    // console.log(match);
    return match;
}
export async function editAccount(
    currProfile: User,
    newProfile: any,
    id: string
) {
    try {
        if (currProfile.email != newProfile.email) {
            const userArr: User = await getUserWithEmail(
                newProfile.email
            ).then();
            if (userArr[1] == null) {
                currProfile.email = newProfile.email;
            } else {
                return [
                    404,
                    { msg: "Email is already affiliated to an account" },
                ];
            }
        }
        currProfile = newProfile;
        updateUser(currProfile, id);
    } catch (err: any) {
        return [400, { msg: "missing field" }];
    }
    return [200, currProfile];
}

export async function sendInvite(receiverEmail: string, senderEmail: string) {
    try {
        await sendUserInvitation(receiverEmail, senderEmail);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    return [200, { msg: "Invitation sent" }];
}
export async function followCompany(
    receiverEmail: string,
    senderEmail: string
) {
    try {
        await followCompanyInv(receiverEmail, senderEmail);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    return [200, { msg: "Invitation sent" }];
}

export async function unFollowCompany(
    receiverEmail: string,
    senderEmail: string
) {
    try {
        await unFollowCompanyInv(receiverEmail, senderEmail);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    return [200, { msg: "Invitation sent" }];
}

export async function manageInvite(
    senderEmail: string,
    invitedEmail: string,
    isAccept: boolean
) {
    try {
        // console.log(isAccept);
        await manageUserInvitation(senderEmail, invitedEmail, isAccept);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    if (isAccept) {
        return [200, { msg: "Invitation Accepted! " }];
    } else {
        return [200, { msg: "Invitation Declined " }];
    }
}

export async function getInvitationsOrContacts(
    userEmail: string,
    contact: boolean
) {
    let userList: User[];

    try {
        userList = await getUserInvitationsOrContacts(userEmail, contact);
    } catch (error) {
        console.log((error as Error).message);
        return [404, { msg: (error as Error).message }];
    }

    return [200, userList];
}

function validateUserFilter(filter: UserFilter) {
    let error_data: any = { errMsg: "", errType: "" };
    try {
        user_filter_schema.validateSync(filter);
    } catch (err: any) {
        error_data.errType = err.name;
        error_data.errMsg = err.errors;
        return [true, error_data];
    }
    return [false, {}];
}

export async function getFilteredUsersController(filter: UserFilter) {
    let stripped_filer = user_filter_schema.cast(filter, {
        stripUnknown: true,
    });

    let [err, error_data] = validateUserFilter(stripped_filer);
    if (err) {
        return [400, error_data];
    } else {
        let users = await getFilteredUsers(stripped_filer, false);

        // parse_links(products);
        return [200, users];
    }
}
export async function getFilteredCompaniesController(filter: UserFilter) {
    let stripped_filer = user_filter_schema.cast(filter, {
        stripUnknown: true,
    });

    let [err, error_data] = validateUserFilter(stripped_filer);
    if (err) {
        return [400, error_data];
    } else {
        let users = await getFilteredUsers(stripped_filer, true);

        // parse_links(products);
        return [200, users];
    }
}
export async function generateAccessToken(username: any) {
    // console.log(await process.env.TOKEN_SECRET);
    //console.log(process.env.TOKEN_SECRET!);
    return sign(username, process.env.TOKEN_SECRET!, { expiresIn: "28800000" });
}
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies);
    const { FrontendUser } = req.cookies;
    try {
        const { iat, exp, ...payload } = jwt.verify(
            FrontendUser,
            process.env.TOKEN_SECRET!
        ) as User;
        req.cookies.user = payload; //Maybe not good will need to recheck
        next();
    } catch (err: any) {
        res.status(401).json("Invalid Session");
    }
}
export function hasUser(request: Request): request is Request & { user: any } {
    return "user" in request;
}
export function hasFile(request: Request): request is Request & { file: any } {
    return "file" in request;
}
