import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export async function CreateUser() {
  console.log("hello");
  const usersCollectionRef = collection(db, "users");
  await addDoc(usersCollectionRef, {
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });
}
