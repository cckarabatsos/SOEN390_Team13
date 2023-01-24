//thx saad
import firebase from "firebase";
const db = firebase.firestore();

export const findUserWithID = async (userID: string) => {
  const snapShot = await db.collection("users").doc(userID).get();
  return snapShot.data();
};
