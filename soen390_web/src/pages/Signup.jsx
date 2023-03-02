import { Button, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../api/loginApi";
import background from "../assets/undraw_online_resume_re_ru7s.png";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import "../styles/components/Login.css";
import "../styles/components/SignUp.css";
import { useTranslation } from "react-i18next";

function SignUp(props) {
  const [fNameInput, setfNameInput] = React.useState("");
  const [lNameInput, setlNameInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");
  const [registerError, setRegisterError] = React.useState(false);
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);

  let navigate = useNavigate();

  const { t } = useTranslation();

  const registerUser = async () => {
    if (confirmPasswordInput === passwordInput) {
      const success = await CreateUser(
        fNameInput,
        lNameInput,
        emailInput,
        passwordInput
      );
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
      lNameInput.length <= 0 ||
      emailInput.length <= 0 ||
      passwordInput.length <= 0 ||
      confirmPasswordInput.length <= 0
    );
  };

  return (
    <div data-testid="signup-1">
      <>
        <div className="background-color">
          <div
            className="signup"
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <div className="form-group">
              <div>
                <h1 data-testid="signuptitle-1">Sign Up</h1>
                <Grid container spacing={2}>
                  <Grid className="field-name" item xs={4}>
                  {t("FirstNameText")}
                  </Grid>
                  <Grid className="field-input" item xs={8}>
                 
                    <div className="input-margin">
                      <TextField
                        autoFocus
                        className="inputRounded"
                        margin="dense"
                        label={t("FirstNameText")}
                        type="name"
                        variant="outlined"
                        size="small"
                        value={fNameInput}
                        onChange={(e) => setfNameInput(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid className="field-name" item xs={4}>
                  {t("LastNameText")}
                  </Grid>
                  <Grid className="field-input" item xs={8}>
                    <div className="input-margin">
                      <TextField
                        autoFocus
                        className="inputRounded"
                        margin="dense"
                        label= {t("LastNameText")}
                        type="name"
                        variant="outlined"
                        size="small"
                        value={lNameInput}
                        onChange={(e) => setlNameInput(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid className="field-name" item xs={4}>
                  {t("emailText")}
                  </Grid>
                  <Grid className="field-input" item xs={8}>
                    <div className="input-margin">
                      <TextField
                        autoFocus
                        className="inputRounded"
                        margin="dense"
                        label={t("emailText")}
                        type="email"
                        variant="outlined"
                        size="small"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid className="field-name" item xs={4}>
                    Create Password
                  </Grid>
                  <Grid className="field-input" item xs={8}>
                    <div className="input-margin">
                      <TextField
                        autoFocus
                        className="inputRounded"
                        margin="dense"
                        label="Create Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid className="field-name" item xs={4}>
                    Confirm Password
                  </Grid>
                  <Grid className="field-input" item xs={6}>
                    <div className="input-margin">
                      <TextField
                        className="inputRounded"
                        autoFocus
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        value={confirmPasswordInput}
                        onChange={(e) =>
                          setConfirmPasswordInput(e.target.value)
                        }
                      />
                    </div>
                  </Grid>
                  {passwordMismatch ? (
                    <Grid item xs={12} style={{ color: "red" }}>
                      Passwords do not Match
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {registerError ? (
                    <Grid item xs={12} style={{ color: "red" }}>
                      User already has an account
                    </Grid>
                  ) : (
                    <></>
                  )}
                  <Grid className="cancel" item xs={6}>
                    <Button
                      className="button"
                      variant="contained"
                      style={{
                        borderRadius: 27,
                        backgroundColor: "rgba(100, 69, 227, 0.85)",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid className="login" item xs={6}>
                    <Button
                      className="button"
                      variant="contained"
                      disabled={fieldsEmpty()}
                      style={{
                        borderRadius: 27,
                        backgroundColor: "rgba(100, 69, 227, 0.85)",
                      }}
                      onClick={registerUser}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <GoogleLogin />
                  </Grid>
                  <Grid item xs={12}>
                    Already have an account? Login <Link to="/">here!</Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <SubFooter />
        <Footer />
      </>
    </div>
  );
}

export default SignUp;
