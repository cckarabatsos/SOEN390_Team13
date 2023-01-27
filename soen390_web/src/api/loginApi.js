import { auth, provider, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import axios, * as others from "axios";
import api from "../config.json";

export function GoogleSignin({ setIsAuth }) {
  signInWithPopup(auth, provider).then((result) => {
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    CreateUser();
  });
}

export async function SignInUser(reqEmail, reqPassword) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/login", {
      params: {
        email: reqEmail,
        password: reqPassword,
      },
    });
    console.log(response.data.name);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
  // signInWithPopup(auth, provider).then((result) => {
  //   localStorage.setItem("isAuth", true);
  //   setIsAuth(true);
  //   CreateUser();
  // });
}

export async function CreateUser() {
  console.log("hello");
  const usersCollectionRef = collection(db, "users");
  await addDoc(usersCollectionRef, {
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });
}
