// const UserDB = require("../firebaseconfig.ts");
import firebase from "firebase";
const db = firebase.firestore();
export async function findUserWithID(userID: string) {
    const user = "";
    // const userRef = await db.collection("users").doc(userID).get();
    // Small bug just need to get one document
    console.log(userID);
    const userRef = db.collection("users");
    const snapshot = await userRef.get();
    snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
    return user;
}
