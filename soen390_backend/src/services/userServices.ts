//thx saad
import { error } from "console";
import firebase from "firebase";
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
          console.log("error in sender");
          resolve(null);
        } else {
          console.log("sender good");
          resolve(user);
        }
      });
    });

    var receiverUser: any;
    receiverUser = await new Promise((resolve, _) => {
      findUserWithEmail(receiverEmail, (user) => {
        // console.log(user);
        if (user == null) {
          console.log("error in sender");
          resolve(null);
        } else {
          console.log("sender good");
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
    if ((senderUser as User).pendingInvitations.includes(receiverEmail)) {
      //console.log("error sender already invited by receiver");
      throw error("error sender already invited by receiver");
    } else {
      console.log("proceed check 1");
    }

    //check 2: check if sendter is not already in the pendings of receiver
    if ((receiverUser as User).pendingInvitations.includes(senderEmail)) {
      //console.log("error receiver already invited by sender");
      throw error("error receiver already invited by sender");
    } else {
      console.log("proceed check 2");
    }

    console.log(
      "sender name: " + senderUser.name + " Id: " + senderUser.userID
    );
    console.log(
      "sender name: " + receiverUser.name + " Id: " + receiverUser.userID
    );

    //check 3 : check if sender and receiver are already contacts
    if ((senderUser as User).contacts.includes(receiverEmail)) {
      //console.log("error sender and receiver are already friends");
      throw error("error sender and receiver are already friends");
    } else {
      console.log("proceed check 3");
    }

    // update receiver pendinginvitation filed

    db.collection("users")
      .doc(receiverUser.userID)
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
  receiverEmail: string,
  senderEmail: string,
  isAccept: boolean
) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export function updateUser(newProfile: User, id: string) {
  db.collection("users").doc(id).update(newProfile);
}
