/**
 * Controller methods for User entity of the database
 */
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
    removeUserContact,
} from "../services/userServices";
import dotenv from "dotenv";
import {
    User,
    UserFilter,
    user_filter_schema,
    user_schema,
} from "../models/User";
import { hash } from "bcryptjs";
import { Request } from "express";
import jwt from "jsonwebtoken";
const { sign } = jwt;
const saltRounds = 4;
dotenv.config();

/**
 * Tries to retrieve user with specified ID from database
 *
 * @param userID
 * @returns status and response message
 */
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
/**
 * Tries to retrieve user with specified Email from database
 *
 * @param email
 * @returns status and response message
 */
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
/**
 * Cast a user and send it to the database
 *
 * @param User:any (json object)
 * @returns status and response message
 */
export async function registerUser(user: any) {
    if (user.name === "" || user.email === "" || user.password === "") {
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
/**
 * Delete a user with a certainID from the database
 *
 * @param UserID
 * @returns status and response message
 */
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

/**
 * Tries to upload an account file to database
 *
 * @param userID
 * @param type
 * @param file
 * @returns status and response message
 */
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

/**
 * Tries to remove specified account file from database
 *
 * @param userID
 * @param type
 * @returns status and response message
 */
export async function removeAccountFile(userID: string, type: string) {
    let success = await deleteAccountFile(userID, type);
    if (success === null) {
        return [404, { msg: "File retrieval failed." }];
    } else {
        return [200, success];
    }
}

/**
 * Tries to retrieve specified account file from database
 *
 * @param userID
 * @param type
 * @returns status and repsonse message
 */
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
/**
 * Send an account to the database and edit the old account
 * @param currProfile
 * @param newProfile
 * @param id
 * @returns currProfile
 */
export async function editAccount(
    currProfile: User,
    newProfile: any,
    id: string
) {
    try {
        if (currProfile.email !== newProfile.email) {
            throw new Error("Email cannot be changed.");
        }
        if (!newProfile.password) {
            newProfile.password = currProfile.password;
        } else if (newProfile.password === currProfile.password) {
            newProfile.password = currProfile.password;
        } else {
            newProfile.password = await hash(newProfile.password, saltRounds);
        }
        console.log(newProfile);
        currProfile = newProfile;
        updateUser(currProfile, id);
    } catch (err: any) {
        return [400, { msg: "missing field" }];
    }
    return [200, currProfile];
}
/**
 * Send an inviteto a user not a company
 * @param receiverEmail
 * @param senderEmail
 * @returns
 */
export async function sendInvite(receiverEmail: string, senderEmail: string) {
    try {
        await sendUserInvitation(receiverEmail, senderEmail);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    return [200, { msg: "Invitation sent" }];
}
/**
 * Function to remove a certain contact for a user
 * @param receiverEmail
 * @param senderEmail
 * @returns [status,msg:""]
 */
export async function removeContact(senderEmail: string, removedEmail: string) {
    try {
        await removeUserContact(senderEmail, removedEmail);
    } catch (error) {
        return [404, { msg: (error as Error).message }];
    }

    return [200, { msg: "Invitation sent" }];
}
/**
 * follow a company
 * @param receiverEmail
 * @param senderEmail
 * @returns
 */
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

/**
 * unFollow a company
 * @param receiverEmail
 * @param senderEmail
 * @returns
 */
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
/**
 * Accept or decline a user invite
 * @param senderEmail
 * @param invitedEmail
 * @param isAccept
 * @returns
 */
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
/**
 * Get the invitations or contacts that are associated with an email
 * @param userEmail
 * @param contact
 * @returns
 */
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
/**
 * Validate a userfilter schema with the
 * @param filter
 * @returns
 */

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
/**
 * Get filtered users via a userFilter
 * @param filter :UserFilter
 * @returns filteredUsers
 */

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
/**
 * Get filtered companies via a userFilter
 * @param filter :UserFilter
 * @returns filteredCompanies
 */
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
/**
 * Generate a JWT access token
 * @param username
 * @returns
 */
export async function generateAccessToken(username: any) {
    // console.log(await process.env.TOKEN_SECRET);
    //console.log(process.env.TOKEN_SECRET!);
    return sign(username, process.env.TOKEN_SECRET!, { expiresIn: "28800000" });
}
/**
 * Add a file to the request type
 * @param request
 * @returns
 */
export function hasFile(request: Request): request is Request & { file: any } {
    return "file" in request;
}
