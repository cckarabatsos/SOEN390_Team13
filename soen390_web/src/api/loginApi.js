import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";

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
    return response.data.registeredUser;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

export async function CreateUser(firstNameIn, lastNameIn, emailIn, passwordIn) {
  try {
    const response = await axios.post(api.BACKEND_API + "/user/api/register", {
      email: emailIn,
      password: passwordIn,
      name: firstNameIn + " " + lastNameIn,
    });
    return response.data;
  } catch (err) {
    console.error("yo", err);
  }
}
