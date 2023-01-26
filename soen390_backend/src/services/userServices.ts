//thx saad
import { error } from "console";
import firebase from "firebase";
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
                console.log("YO");
                callback(null);
            }
        })
        .catch((error) => {
            console.log("Error getting the document:", error);
            throw new Error(error.message);
        });
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
