//thx saad
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
            let data = processData(snapshot);
            callback(data);
        })
        .catch((error) => {
            console.log("Error getting the document:", error);
        });
};

function processData(snapshot: any) {
    let data = snapshot.docs.map((doc: { data: () => any }) => doc.data());
    return data[0];
}
