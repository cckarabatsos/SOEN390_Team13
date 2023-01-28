import { Button, Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import TextField from "@mui/material/TextField";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import background from "../assets/undraw_online_resume_re_ru7s.png";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SubFooter from "../components/SubFooter";
import "../styles/components/Login.css";
import "../styles/components/SignUp.css";

function SignUp(props) {
  const svgIcon = (
    <Icon>
      <img alt="Google" src="../assets/google-icon.svg" />
    </Icon>
  );

  return (
    <>
      <NavBar />
      <div className="background-color">
        <div
          className="signup"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="form-group">
            <div>
              <h1>Sign Up</h1>
              <Grid container spacing={2}>
                <Grid className="field-name" item xs={4}>
                  First Name
                </Grid>
                <Grid className="field-input" item xs={8}>
                  <div className="input-margin">
                    <TextField
                      autoFocus
                      className="inputRounded"
                      margin="dense"
                      label="First Name"
                      type="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </Grid>
                <Grid className="field-name" item xs={4}>
                  Last Name
                </Grid>
                <Grid className="field-input" item xs={8}>
                  <div className="input-margin">
                    <TextField
                      autoFocus
                      className="inputRounded"
                      margin="dense"
                      label="Last Name"
                      type="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </Grid>
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
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid className="login" item xs={6}>
                  <Button
                    className="button"
                    variant="contained"
                    style={{
                      borderRadius: 27,
                      backgroundColor: "rgba(100, 69, 227, 0.85)",
                    }}
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
  );
}

export default SignUp;
