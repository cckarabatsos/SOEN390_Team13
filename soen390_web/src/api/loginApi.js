import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";

// export function GoogleSignin({ setIsAuth }) {
//     signInWithPopup(auth, provider).then((result) => {
//         localStorage.setItem("isAuth", true);
//         setIsAuth(true);
//         CreateUser();
//     });
// }

export async function SignInUser(reqEmail, reqPassword) {
    try {
        const response = await axios.get(api.BACKEND_API + "/user/api/login", {
            params: {
                email: reqEmail,
                password: reqPassword,
            },
        });
        console.log(response);
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
                isCompany: false,
                currentCompany: "Concordia University",
                currentPosition: "Student",
                bio: "",
                coverLetter: "",
                resume: "",
                picture: "",
                publicKey: "",
                privateKey: "",
                email: emailIn,
                password: passwordIn,
                name: firstNameIn + " " + lastNameIn,
            })
            .then((res) => {
                return res.data;
            });
        return response;
    } catch (err) {
        console.error("yo", err);
    }
}
export async function GoogleSignin(emailIn, nameIn, logoIn) {
    try {
        const response = await axios.post(
            api.BACKEND_API + "/user/api/GoogleSignUp",
            {
                isCompany: false,
                currentCompany: "",
                currentPosition: "",
                bio: "",
                coverLetter: "",
                resume: "",
                picture: logoIn,
                publicKey: "",
                privateKey: "",
                email: emailIn,
                name: nameIn,
            }
        );
        console.log(response);
        return response;
    } catch (err) {
        console.error("yo", err);
    }
}

export async function CreateCompany(nameIn, emailIn, passwordIn) {
    try {
        const response = await axios
            .post(api.BACKEND_API + "/user/api/register", {
                name: nameIn,
                password: passwordIn,
                email: emailIn,
                privateKey: "",
                publicKey: "",
                picture: "",
                resume: "",
                coverLetter: "",
                bio: "Initial description text",
                currentPosition: "Recruiter",
                currentCompany: nameIn,
                isCompany: true,
            })
            .then((res) => {
                return res.data;
            });
        return response;
    } catch (err) {
        console.error("yo", err);
    }
}
