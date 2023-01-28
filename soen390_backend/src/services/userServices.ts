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
        });

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
            db.collection("users").doc(userID).delete().then(() => {
                console.log("User with ID " + userID + "successfully deleted.");
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return data;
};

function processData(snapshot: any) {
    let data = snapshot.docs.map((doc: { data: () => any }) => doc.data());
    if (data !== null) {
        return data[0];
    } else {
        console.log("ERROR");
        throw error;
    }
}
