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
    const response = await axios
      .get(api.BACKEND_API + "/user/api/login", {
        params: {
          email: reqEmail,
          password: reqPassword,
        },
      })
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function CreateUser(firstNameIn, lastNameIn, emailIn, passwordIn) {
  try {
    const response = await axios
      .post(api.BACKEND_API + "/user/api/register", {
        isRecruiter: false,
        currentCompany: "Concordia University",
        currentPosition: "Student",
        bio: "I am Liam and I want to be an engineer.",
        coverLetter: "",
        resume: "",
        picture: "",
        publicKey: "",
        privateKey: "",
        email: emailIn,
        password: passwordIn,
        name: firstNameIn+" "+ lastNameIn,
      })
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.error("yo", err);
  }
}
