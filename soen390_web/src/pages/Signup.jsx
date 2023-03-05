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
      <div>
        <div
          className="signup"
          style={{ backgroundImage: `url(${background})` }}
        >
          <p className="signuptitle" data-testid="signuptitle-1">
            One step away from a remarkable career
          </p>
          <div className="form-group">
            <Grid container spacing={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <div className="name-field">{t("FirstNameText")}</div>
                  <div className="field-input">
                    <div className="margin-input">
                      <TextField
                        autoFocus
                        className="Roundedinput"
                        margin="dense"
                        label={t("FirstNameText")}
                        type="name"
                        variant="outlined"
                        size="small"
                        value={fNameInput}
                        onChange={(e) => setfNameInput(e.target.value)}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="name-field">{t("LastNameText")}</div>
                  <div className="field-input">
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
                        onChange={(e) => setlNameInput(e.target.value)}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="name-field">{t("emailText")}</div>
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
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="name-field">{t("CreatePasswordText")}</div>
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
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="name-field">{t("ConfirmPasswordText")}</div>
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
                          setConfirmPasswordInput(e.target.value)
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
                <GoogleLogin />
              </Grid>
              <Grid item xs={12}>
                {t("AlreadyAccountText")} <Link to="/">{t("HereText")}</Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
