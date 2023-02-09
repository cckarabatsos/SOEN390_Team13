//thx saad
import { error } from "console";
import firebase from "firebase";
import "firebase/storage";
import { User, user_schema } from "../models/User";
// import { database } from "firebase-admin";

const db = firebase.firestore();
const ref = firebase.storage().ref();

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

export const storeAccountFile = async (userID: string, file: Uint8Array) => {
    try {
        ref.child(userID + " - Resume.pdf").put(file).then((snapshot) => {
            console.log("Saved file in firebase storage!");
            return snapshot;
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
};

export const findAccountFile = async (userID: string, type: string) => {
    try {
        var user: any = await findUserWithID(userID);
        if (user) {
            let casted_user = await user_schema.cast(user);
            if (type.toUpperCase() === "RESUME") {
                console.log(casted_user.resume);
                return casted_user.resume;
            }
            else if (type.toUpperCase() === "COVERLETTER") {
                console.log(casted_user.coverLetter);
                return casted_user.coverLetter;
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return null;
}

function processData(snapshot: any) {
    let data = snapshot.docs.map((doc: { data: () => any }) => doc.data());
    if (data !== null) {
        return data[0];
    } else {
        console.log("ERROR");
        throw error;
    }
}
