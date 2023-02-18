import { Button, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../api/loginApi";
import background from "../assets/undraw_login_re_4vu2.svg";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import "../styles/components/Login.css";

function MainTitle(props) {
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const navigate = useNavigate();

  const signInUser = async () => {
    const success = await SignInUser(emailInput, passwordInput);
    console.log(success);
    setIsAuth(success.data);
    success.status === 200
      ? navigate("/UserProfile")
      : console.log("Login Fail");
  };

  const setIsAuth = (data) => {
    console.log(data);
    localStorage.setItem("isAuth", JSON.stringify(data));
  };

  return (
    <div data-testid="login-1">
      <>
        <div className="background-color">
          <div
            className="background"
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <div className="login-form">
              <Grid container spacing={2}>
                <Grid className="field-name" item xs={4}>
                  Email Address
                </Grid>
                <Grid className="field-input" item xs={8}>
                  <div className="input-margin">
                    <TextField
                      autoFocus
                      className="inputRounded"
                      margin="dense"
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      size="small"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid className="field-name" item xs={4}>
                  Password
                </Grid>
                <Grid className="field-input" item xs={6}>
                  <div className="input-margin">
                    <TextField
                      className="inputRounded"
                      autoFocus
                      margin="dense"
                      label="Password"
                      type="password"
                      variant="outlined"
                      size="small"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>
                </Grid>
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
                    onClick={signInUser}
                    style={{
                      borderRadius: 27,
                      backgroundColor: "rgba(100, 69, 227, 0.85)",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <GoogleLogin />
                </Grid>
                <Grid item xs={12}>
                  Don't have an account? Sign up <Link to="/Signup">here!</Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <SubFooter />
        <Footer />
      </>
    </div>
  );
}

export default MainTitle;
