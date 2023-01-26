import React from "react";
import NavBar from "../components/NavBar";
import background from "../assets/undraw_login_re_4vu2.svg"
import "../styles/components/Login.css"
import TextField from "@mui/material/TextField";
import { Grid } from "@material-ui/core";
import {Button} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Link } from "react-router-dom";


function MainTitle(props) {
  const svgIcon = (
    <Icon>
      <img alt="Google" src="../assets/google-icon.svg" />
    </Icon>
  );

  return (
    <>
      <NavBar />
      <div className="background-color">
        <div className="background" style={{ 
        backgroundImage: `url(${background})` 
        }}>
          <div className ="login-form">
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
                />
              </div>
            </Grid>
            <Grid className="field-name" item xs={4}>
              Password
            </Grid>
            <Grid className="field-input" item xs={6}>
              <div className="input-margin">
                <TextField className="inputRounded"
                  autoFocus
                  margin="dense"
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                />
              </div>
            </Grid>
            <Grid className="cancel" item xs={6}>
              <Button className="button" variant="contained"
              style={{
                borderRadius: 27,
                backgroundColor: "rgba(100, 69, 227, 0.85)"
              }}>Cancel</Button>
            </Grid>
            <Grid className="login" item xs={6}>
              <Button className="button" variant="contained"
              style={{
                borderRadius: 27,
                backgroundColor: "rgba(100, 69, 227, 0.85)"
              }}>Login</Button>
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
    </>
  );
}

export default MainTitle;