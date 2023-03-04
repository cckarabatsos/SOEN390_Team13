//thx saad
import { error } from "console";
import firebase from "firebase";
import "firebase/storage";
import { User, user_schema, UserFilter } from "../models/User";
// import { database } from "firebase-admin";

const db = firebase.firestore();
const ref = firebase.storage().ref();
import { Buffer } from "buffer";

export const findUserWithID = async (userID: string) => {
    try {
        var snapShot = await db.collection("users").doc(userID).get();
    } catch (error) {
        console.log(error);
        throw error;
    }
    return snapShot.data();
};
export const findUserWithEmail = (
    email: string,
    callback: (data: any) => void
) => {
    db.collection("users")
        .where("email", "==", email)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let data = processData(snapshot);
                callback(data);
            } else {
                callback(null);
            }
        })
        .catch((error) => {
            console.log("Error getting the document:", error);
            throw new Error(error.message);
        });
};

export const storeUser = async (user: User) => {
    try {
        let pic = user.picture
            ? user.picture
            : await ref
                  .child("Profile Pictures/blank_profile_pic.png")
                  .getDownloadURL();
        user.picture = pic;
        var document = await db.collection("users").add({
            ...user,
        });

        await document.update({ userID: document.id });

        console.log("User successfully registered with id: " + document.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return document.id;
};

export const deleteUserWithId = async (userID: string) => {
    try {
        var data: any = await findUserWithID(userID);
        if (data !== undefined) {
            if (data.jobpostings) {
                const batch = db.batch();
                console.log(data.jobpostings.postingids);
                data.jobpostings.postingids.forEach((postingID: string) => {
                    const postingRef = db
                        .collection("jobpostings")
                        .doc(postingID);
                    batch.delete(postingRef);
                });
                await batch.commit();
                console.log(
                    data.jobpostings.postingids.length +
                        " job postings successfully deleted."
                );
            }
            db.collection("users")
                .doc(userID)
                .delete()
                .then(() => {
                    console.log(
                        "User with ID " + userID + "successfully deleted."
                    );
                });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    return data;
};
export const storeAccountFile = async (
    userID: string,
    type: string,
    file: any
) => {
    try {
        let user = await findUserWithID(userID);
        if (!file || user === undefined) {
            return null;
        }

        if (user) {
            let casted_user = await user_schema.cast(user);
            const buffer = Buffer.from(file.buffer);
            const metadata = {
                contentType: file.mimetype,
            };
            let folder: string;
            if (Array.isArray(type)) {
                type = type[0];
            }
            console.log(type);
            deleteAccountFile(userID, type);
            if (type.toUpperCase() == "RESUME") {
                folder = "Resumes/";
            } else if (type.toUpperCase() == "COVERLETTER") {
                folder = "Cover Letters/";
            } else if (type.toUpperCase() == "PICTURE") {
                folder = "Profile Pictures/";
            } else {
                return null;
            }
            console.log(file.originalname);
            const uploadTask = await ref
                .child(folder + userID + " - " + file.originalname)
                .put(buffer, metadata);
            const downloadURL = await uploadTask.ref.getDownloadURL();
            if (downloadURL) {
                if (type.toUpperCase() == "RESUME") {
                    casted_user.resume = downloadURL;
                } else if (type.toUpperCase() == "COVERLETTER") {
                    casted_user.coverLetter = downloadURL;
                } else {
                    casted_user.picture = downloadURL;
                }
                updateUser(casted_user, userID);
                return downloadURL;
            }
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};

export const deleteAccountFile = async (userID: string, type: string) => {
    try {
        var user: any = await findUserWithID(userID);
        if (user === undefined) {
            return null;
        }
        if (user) {
            let url: string;
            let casted_user = await user_schema.cast(user);
            if (Array.isArray(type)) {
                type = type[0];
            }
            if (type.toUpperCase() == "RESUME") {
                url = casted_user.resume;
                casted_user.resume = "";
            } else if (type.toUpperCase() == "COVERLETTER") {
                url = casted_user.coverLetter;
                casted_user.coverLetter = "";
            } else if (type.toUpperCase() == "PICTURE") {
                url = casted_user.picture;
                casted_user.picture = "";
            } else {
                return null;
            }
            var fileRef = ref.storage.refFromURL(url);
            await fileRef.delete().then(function () {
                updateUser(casted_user, userID);
                console.log("File successfully deleted.");
            });
            return "Success";
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};

export const findAccountFile = async (userID: string, type: string) => {
    try {
        var user: any = await findUserWithID(userID);
        if (user === undefined) {
            return null;
        }
        if (user) {
            let casted_user = await user_schema.cast(user);
            if (type.toUpperCase() === "RESUME") {
                console.log(casted_user.resume);
                return casted_user.resume;
            } else if (type.toUpperCase() === "COVERLETTER") {
                console.log(casted_user.coverLetter);
                return casted_user.coverLetter;
            } else if (type.toUpperCase() === "PICTURE") {
                console.log(casted_user.picture);
                return casted_user.picture;
            } else {
                return null;
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};

function processData(snapshot: any) {
    let data = snapshot.docs.map((doc: { data: () => any; id: string }) => ({
        data: doc.data(),
        id: doc.id,
    }));
    if (data !== null) {
        return data[0];
    } else {
        console.log("ERROR");
        throw error;
    }
}

//helper function to create userNodes
// async function createUserNode(user: UserNode) {
//   try {
//     var document = await db.collection("users").add({
//       name: user.name,
//       email: user.email,
//       picture: user.picture,
//       userID: "",
//     });

//     await document.update({ userID: document.id });

//     console.log("UserNode successfully registered with id: " + document.id);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
//   return document.id;
// }

export async function sendUserInvitation(
    receiverEmail: string,
    senderEmail: string
) {
    try {
        var senderUser: any;

        senderUser = await new Promise((resolve, _) => {
            findUserWithEmail(senderEmail, (user) => {
                // console.log(user);
                if (user == null) {
                    resolve(null);
                } else {
                    resolve(user);
                }
            });
        });

        var receiverUser: any;
        receiverUser = await new Promise((resolve, _) => {
            findUserWithEmail(receiverEmail, (user) => {
                // console.log(user);
                if (user == null) {
                    resolve(null);
                } else {
                    resolve(user);
                }
            });
        });

        if (!(senderUser || receiverUser)) {
            throw error(
                "cannot find desired receiver or sender when trying to send invitation"
            );
        }
        //check 1: check if either of them are a company
        if (
            (senderUser.data as User).isCompany == true ||
            (receiverUser.data as User).isCompany == true
        ) {
            throw error("One of them is a company");
        } else {
            console.log("proceed check 1");
        }
        if (
            (senderUser.data as User).pendingInvitations.includes(receiverEmail)
        ) {
            //check 2: check is receiver is not already in the pendings of sender
            //console.log("error sender already invited by receiver");
            throw error("error sender already invited by receiver");
        } else {
            console.log("proceed check 2");
        }

        //check 3: check if sendter is not already in the pendings of receiver
        if (
            (receiverUser.data as User).pendingInvitations.includes(senderEmail)
        ) {
            //console.log("error receiver already invited by sender");
            throw error("error receiver already invited by sender");
        } else {
            console.log("proceed check 3");
        }

        //check 4 : check if sender and receiver are already contacts
        if ((senderUser.data as User).contacts.includes(receiverEmail)) {
            throw error("error sender and receiver are already friends");
        } else {
            console.log("proceed check 4");
        }

        // update receiver pendinginvitation filed

        db.collection("users")
            .doc(receiverUser.data.userID)
            .update({
                pendingInvitations:
                    firebase.firestore.FieldValue.arrayUnion(senderEmail),
            });
    } catch (error) {
        console.log(error);
        throw new Error("this is an invitation error");
    }
}
export async function followCompanyInv(senderID: string, receiverID: string) {
    const senderUser = await findUserWithID(senderID);
    const receiverUser = await findUserWithID(receiverID);
    try {
        if (senderUser && receiverUser) {
            console.log(senderUser.isCompany);
            if (senderUser.isCompany) {
                throw new Error("Sender is a company");
            } else {
                console.log("Proceed check 1");
            }
            if (receiverUser.contacts.includes(senderID)) {
                throw new Error("Already following");
            } else {
                console.log("Proceed check 2 ");
            }
            db.collection("users")
                .doc(receiverID)
                .update({
                    contacts:
                        firebase.firestore.FieldValue.arrayUnion(senderID),
                });
        }
    } catch (error) {
        console.log(error);
        throw new Error("this is a following error");
    }
}
export async function unFollowCompanyInv(senderID: string, receiverID: string) {
    console.log(senderID);
    const receiverUser = await findUserWithID(receiverID);
    try {
        if (receiverUser) {
            if (receiverUser.contacts.includes(senderID)) {
                db.collection("users")
                    .doc(receiverID)
                    .update({
                        contacts:
                            firebase.firestore.FieldValue.arrayRemove(senderID),
                    });
            }
        } else {
            console.log("You dont even follow that company????");
        }
    } catch (error) {
        console.log(error);
        throw new Error("this is a following error");
    }
}

export async function manageUserInvitation(
    senderEmail: string,
    invitedEmail: string,
    isAccept: boolean
) {
    try {
        let senderUser: any;
        if (isAccept) {
            senderUser = await new Promise((resolve, _) => {
                findUserWithEmail(senderEmail, (user) => {
                    // console.log(user);
                    if (user == null) {
                        resolve(null);
                    } else {
                        resolve(user);
                    }
                });
            });
        }

        var invitedUser: any;

        invitedUser = await new Promise((resolve, _) => {
            findUserWithEmail(invitedEmail, (user) => {
                // console.log(user);
                if (user == null) {
                    resolve(null);
                } else {
                    resolve(user);
                }
            });
        });
        console.log(invitedUser);
        console.log(senderUser);
        // check 1: check if enderEmail is in invitedUser pendingInvitation list
        if (
            !(invitedUser.data as User).pendingInvitations.includes(senderEmail)
        ) {
            //console.log("error receiver already invited by sender");
            throw error("error sender user email not int he invided user list");
        } else {
            console.log("proceed check 1");
        }

        // remove sender email from the pendingInvitations list of the invited user
        db.collection("users")
            .doc(invitedUser.data.userID)
            .update({
                pendingInvitations:
                    firebase.firestore.FieldValue.arrayRemove(senderEmail),
            });

        //if user accept invitation then add senderEmail to invitedUser contact list and vice versa

        if (isAccept) {
            await db
                .collection("users")
                .doc(invitedUser.data.userID)
                .update({
                    contacts:
                        firebase.firestore.FieldValue.arrayUnion(senderEmail),
                });

            await db
                .collection("users")
                .doc(senderUser.data.userID)
                .update({
                    contacts:
                        firebase.firestore.FieldValue.arrayUnion(invitedEmail),
                });
        }
    } catch (error) {
        console.log(error);
        throw new Error("this is a Manage Invitation request error");
    }
}

export async function getUserInvitationsOrContacts(
    email: string,
    contact: boolean
) {
    let userList: User[] = new Array();

    try {
        var currentUser: any;
        currentUser = await new Promise((resolve, _) => {
            findUserWithEmail(email, (user) => {
                // console.log(user);
                if (user == null) {
                    resolve(null);
                } else {
                    resolve(user);
                }
            });
        });

        var userEmails: string[];

        if (contact) {
            userEmails = (currentUser.data as User).contacts;
        } else {
            userEmails = (currentUser.data as User).pendingInvitations;
        }

        for (var i = 0; i < userEmails.length; i++) {
            var sender: any;

            sender = await new Promise((resolve, _) => {
                findUserWithEmail(userEmails[i], (user) => {
                    // console.log(user);
                    if (user == null) {
                        resolve(null);
                    } else {
                        resolve(user);
                    }
                });
            });

            if (sender.data) {
                userList.push(sender.data as User);
            }
        }
    } catch (error) {
        throw new Error("Error in the pending invitation method");
    }
    console.log(userList);
    return userList;
}

export function updateUser(newProfile: User, id: string) {
    db.collection("users").doc(id).update(newProfile);
}

export async function getFilteredUsers(filter: UserFilter) {
    let userRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
        db.collection("users");

    if (filter.name) {
        const prefix = filter.name.toLowerCase();
        const prefixEnd = prefix + "\uf8ff"; // Unicode character that is higher than any other character in a string
        userRef = userRef
            .where("name", ">=", prefix)
            .where("name", "<", prefixEnd);
    }

    if (filter.email) {
        const prefix = filter.email.toLowerCase();
        const prefixEnd = prefix + "\uf8ff"; // Unicode character that is higher than any other character in a string
        userRef = userRef
            .where("email", ">=", prefix)
            .where("email", "<", prefixEnd);
    }
    if (filter.limit) {
        userRef = userRef.limit(filter.limit);
    }
    if (filter.skip) {
        userRef = userRef.startAfter(filter.skip);
    }

    const snapshot = await userRef.get();

    const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return users;
}

export async function updateCompanyPostings(
    postingID: string,
    jobPosterID: string
) {
    const jobPosterRef = db.collection("users").doc(jobPosterID);
    const jobPosterDoc = await jobPosterRef.get();
    const jobPostings = jobPosterDoc.get("jobpostings");

    // Add the new posting ID to the posting IDs array
    jobPostings.postingids.push(postingID);

    // Add an empty string to the applied array for the new posting
    jobPostings.applied.push("");
    // Add an empty string to the documents array for the new posting
    jobPostings.documents.push("");
    // Update the jobpostings object in the user document
    await jobPosterRef.update({
        jobpostings: jobPostings,
    });
}
