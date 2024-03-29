import { Button, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../api/loginApi";
import background from "../assets/undraw_login_re_4vu2.svg";
import "../styles/components/Login.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { GoogleSignin } from "../api/loginApi";
function Login(props) {
    const [emailInput, setEmailInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [incorrectLogin, setIncorrectLogin] = React.useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const signInUser = async () => {
        const success = await SignInUser(emailInput, passwordInput);
        console.log(success);
        setIsAuth(success.data);

        if (success.status === 200) {
            var userData = JSON.parse(localStorage.getItem("isAuth"));
            console.log(userData);

            if (userData.isCompany) {
                navigate("/CompanyProfile", {
                    state: {
                        picture: userData.picture,
                        name: userData.name,
                        description: userData.bio,
                        isFollowing: false,
                        companyId: userData.userID,
                    },
                });
            } else {
                navigate("/UserProfile");
            }
        } else {
            setIncorrectLogin(true);
            console.log("Login Fail");
        }
    };
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user.email);
            console.log(user.displayName);
            console.log(user.photoURL);

            const response = await GoogleSignin(
                user.email,
                user.displayName,
                user.photoURL
            );
            console.log(response.data.registeredUser[1]);
            setIsAuth(response.data.registeredUser[1]);
            if (response.status === 200) {
                var userData = JSON.parse(localStorage.getItem("isAuth"));
                console.log(userData);
                navigate("/UserProfile");
            } else {
                console.log("Login Fail");
            }
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
        }
    };

    const setIsAuth = (data) => {
        console.log(data);
        localStorage.setItem("isAuth", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div data-testid="login-1">
            <div className="background-color">
                <div
                    className="background"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <h3 className="signuptitle">{t("remarkCareertext")}</h3>
                    <div className="login-form">
                        {/* <Grid container spacing={1}> */}
                        <Grid container spacing={2}>
                            <Grid className="field-input" item xs={12}>
                                <div className="field-name">
                                    {t("emailText")}
                                </div>
                                <div className="input-margin">
                                    <TextField
                                        data-testid="email-1"
                                        autoFocus
                                        className="inputRounded"
                                        margin="dense"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        value={emailInput}
                                        onChange={(e) =>
                                            setEmailInput(e.target.value)
                                        }
                                    />
                                </div>
                            </Grid>

                            <Grid className="field-input" item xs={12}>
                                <div className="field-name">
                                    {" "}
                                    {t("passwordText")}{" "}
                                </div>
                                <div className="input-margin">
                                    <TextField
                                        data-testid="password-1"
                                        className="inputRounded"
                                        autoFocus
                                        margin="dense"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        value={passwordInput}
                                        onChange={(e) =>
                                            setPasswordInput(e.target.value)
                                        }
                                    />
                                </div>
                            </Grid>

                            <Grid className="login" item xs={12}>
                                <div className="login-button">
                                    <Button
                                        className="button"
                                        variant="contained"
                                        onClick={signInUser}
                                        style={{
                                            borderRadius: 27,
                                            backgroundColor:
                                                "rgba(100, 69, 227, 0.85)",
                                            color: "white",
                                            boxShadow: "none",
                                        }}
                                    >
                                        {t("LoginText")}
                                    </Button>
                                </div>
                            </Grid>
                            {incorrectLogin && (
                                <Grid item xs={12}>
                                    <div
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            padding: "10px",
                                            borderRadius: "10px",
                                            maxWidth: "400px",
                                            margin: "0 auto",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            minHeight: "50px",
                                        }}
                                    >
                                        You have entered the wrong email or the
                                        wrong password
                                    </div>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <div className="or-container">
                                    <div className="or-line">or</div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div
                                    className="login-with-google-button"
                                    onClick={handleSignInWithGoogle}
                                >
                                    <Button
                                        className="button"
                                        variant="contained"
                                        style={{
                                            borderRadius: 27,
                                            backgroundColor:
                                                "rgba(108, 99, 255, 0.25)",
                                            border: "1px solid #6C63FF",
                                            boxShadow: "none",
                                        }}
                                    >
                                        Login with google
                                    </Button>

                                    <div className="account-text">
                                        {t("NoAccountText")}{" "}
                                        <Link to="/Signup">
                                            {t("ClickHereText")}
                                        </Link>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        {/* </Grid> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
