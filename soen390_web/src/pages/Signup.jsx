import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser, CreateCompany, GoogleSignin } from "../api/loginApi";
import background from "../assets/undraw_online_resume_re_ru7s.png";
import "../styles/components/Login.css";
import "../styles/components/SignUp.css";
import google from "../assets/google.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
function SignUp(props) {
    const [fNameInput, setfNameInput] = React.useState("");
    const [lNameInput, setlNameInput] = React.useState("");
    const [emailInput, setEmailInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");
    const [registerError, setRegisterError] = React.useState(false);
    const [passwordMismatch, setPasswordMismatch] = React.useState(false);
    const [isCompany, setIsCompany] = React.useState(false);
    const [isCompanyName, setIsCompanyName] = React.useState("FirstNameText");

    let navigate = useNavigate();

    const { t } = useTranslation();

    const registerUser = async () => {
        if (confirmPasswordInput === passwordInput) {
            let success = -1;

            if (isCompany) {
                success = await CreateCompany(
                    fNameInput,
                    emailInput,
                    passwordInput
                );
            } else {
                success = await CreateUser(
                    fNameInput,
                    lNameInput,
                    emailInput,
                    passwordInput
                );
            }

            success.registeredUser[0] === 200
                ? navigate("/")
                : setRegisterError(true);
        } else {
            setPasswordMismatch(true);
        }
    };

    const fieldsEmpty = () => {
        return (
            fNameInput.length <= 0 ||
            (!isCompany && lNameInput.length <= 0) ||
            emailInput.length <= 0 ||
            passwordInput.length <= 0 ||
            confirmPasswordInput.length <= 0
        );
    };

    const handleCheckboxClick = (e) => {
        setIsCompany(!isCompany);
        if (!isCompany) {
            setIsCompanyName("Name");
        } else {
            setIsCompanyName("FirstNameText");
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
        <div data-testid="signup-1">
            <div>
                <div
                    className="signup"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <p className="signuptitle" data-testid="signuptitle-1">
                        {t("stepText")}
                    </p>
                    <div className="form-group">
                        <Grid container spacing={1}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <label
                                        for="FirstName"
                                        className="name-field"
                                    >
                                        {t(isCompanyName)}
                                    </label>
                                    <div className="field-input">
                                        <div className="margin-input">
                                            <TextField
                                                autoFocus
                                                className="Roundedinput"
                                                margin="dense"
                                                label={t(isCompanyName)}
                                                type="name"
                                                variant="outlined"
                                                size="small"
                                                value={fNameInput}
                                                onChange={(e) =>
                                                    setfNameInput(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                {!isCompany ? (
                                    <Grid item xs={12} sm={8}>
                                        <label
                                            for="LastName"
                                            className="name-field"
                                        >
                                            {t("LastNameText")}
                                        </label>
                                        <label
                                            for="inputbox"
                                            className="field-input"
                                        >
                                            <div className="margin-input">
                                                <TextField
                                                    autoFocus
                                                    className="Roundedinput"
                                                    margin="dense"
                                                    label={t("LastNameText")}
                                                    type="name"
                                                    variant="outlined"
                                                    size="small"
                                                    value={lNameInput}
                                                    onChange={(e) =>
                                                        setlNameInput(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </label>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                                <Grid item xs={12} sm={8}>
                                    <div className="name-field">
                                        {t("emailText")}
                                    </div>
                                    <div className="field-input">
                                        <div className="margin-input">
                                            <TextField
                                                autoFocus
                                                className="Roundedinput"
                                                margin="dense"
                                                label={t("emailText")}
                                                type="email"
                                                variant="outlined"
                                                size="small"
                                                value={emailInput}
                                                onChange={(e) =>
                                                    setEmailInput(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="name-field">
                                        {t("CreatePasswordText")}
                                    </div>
                                    <div className="field-input">
                                        <div className="margin-input">
                                            <TextField
                                                autoFocus
                                                className="Roundedinput"
                                                margin="dense"
                                                label={t("CreatePasswordText")}
                                                type="password"
                                                variant="outlined"
                                                size="small"
                                                value={passwordInput}
                                                onChange={(e) =>
                                                    setPasswordInput(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="name-field">
                                        {t("ConfirmPasswordText")}
                                    </div>
                                    <div className="field-input">
                                        <div className="margin-input">
                                            <TextField
                                                autoFocus
                                                className="Roundedinput"
                                                margin="dense"
                                                label={t("ConfirmPasswordText")}
                                                type="password"
                                                variant="outlined"
                                                size="small"
                                                value={confirmPasswordInput}
                                                onChange={(e) =>
                                                    setConfirmPasswordInput(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            {passwordMismatch ? (
                                <Grid item xs={12} style={{ color: "red" }}>
                                    {t("MismatchPasswordText")}
                                </Grid>
                            ) : (
                                <></>
                            )}
                            {registerError ? (
                                <Grid item xs={12} style={{ color: "red" }}>
                                    {t("AccountExitsText")}
                                </Grid>
                            ) : (
                                <></>
                            )}
                            <Grid className="login" item xs={12}>
                                <div class="checkbox-container">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isCompany}
                                                onChange={handleCheckboxClick}
                                                label="Company"
                                            />
                                        }
                                        label="Company"
                                    />
                                </div>
                                <Button
                                    className="button"
                                    variant="contained"
                                    disabled={fieldsEmpty()}
                                    style={{
                                        borderRadius: 27,
                                        backgroundColor: "#6C63FF",
                                        width: 270,
                                    }}
                                    onClick={registerUser}
                                >
                                    {t("SignUpText")}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <button
                                    id="google-sign-in-button"
                                    onClick={handleSignInWithGoogle}
                                >
                                    <img
                                        src={google}
                                        alt="Sign in with Google"
                                    />
                                    <span>Sign in with Google</span>
                                </button>
                            </Grid>
                            <Grid item xs={12}>
                                {t("AlreadyAccountText")}{" "}
                                <Link to="/">{t("HereText")}</Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
