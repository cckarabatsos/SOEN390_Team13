//thx saad
import { error } from "console";
import firebase from "firebase";
//import { string } from "yup";
import { User } from "../models/User";
// import { database } from "firebase-admin";

const db = firebase.firestore();

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
    var document = await db.collection("users").add({
      name: user.name,
      password: user.password,
      email: user.email,
      privateKey: user.privateKey,
      publicKey: user.publicKey,
      picture: user.picture,
      resume: user.resume,
      coverLetter: user.coverLetter,
      bio: user.bio,
      currentPosition: user.currentPosition,
      currentCompany: user.currentCompany,
      isRecruiter: user.isRecruiter,
      userID: "",
      pendingInvitations: [],
      contacts: [],
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
      db.collection("users")
        .doc(userID)
        .delete()
        .then(() => {
          console.log("User with ID " + userID + "successfully deleted.");
        });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
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

    //check 1: check is receiver is not already in the pendings of sender
    if ((senderUser.data as User).pendingInvitations.includes(receiverEmail)) {
      //console.log("error sender already invited by receiver");
      throw error("error sender already invited by receiver");
    } else {
      console.log("proceed check 1");
    }

    //check 2: check if sendter is not already in the pendings of receiver
    if ((receiverUser.data as User).pendingInvitations.includes(senderEmail)) {
      //console.log("error receiver already invited by sender");
      throw error("error receiver already invited by sender");
    } else {
      console.log("proceed check 2");
    }

    // console.log(
    //   "sender name: " + senderUser.data.name + " Id: " + senderUser.data.userID
    // );
    // console.log(
    //   "sender name: " +
    //     receiverUser.data.name +
    //     " Id: " +
    //     receiverUser.data.userID
    // );

    //check 3 : check if sender and receiver are already contacts
    if ((senderUser.data as User).contacts.includes(receiverEmail)) {
      //console.log("error sender and receiver are already friends");
      throw error("error sender and receiver are already friends");
    } else {
      console.log("proceed check 3");
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
    if (!(invitedUser.data as User).pendingInvitations.includes(senderEmail)) {
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
          contacts: firebase.firestore.FieldValue.arrayUnion(senderEmail),
        });

      await db
        .collection("users")
        .doc(senderUser.data.userID)
        .update({
          contacts: firebase.firestore.FieldValue.arrayUnion(invitedEmail),
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
