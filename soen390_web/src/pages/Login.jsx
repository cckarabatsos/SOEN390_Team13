import React from "react";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";

async function CreateUser() {
    console.log("hello");
    const usersCollectionRef = collection(db, "users");
    await addDoc(usersCollectionRef, {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
    });
}

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    /**
     * Sign in with google and then navigate to homepage
     */
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            //Add setisAuth(true) later on
            CreateUser();
            navigate("/");
        });
    };

    return (
        <div className="loginPage">
            <p>Sign In With Google to Continue</p>
            <button
                className="login-with-google-btn"
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;
