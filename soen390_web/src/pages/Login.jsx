import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    /**
     * Sign in with google and then navigate to homepage
     */
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
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
