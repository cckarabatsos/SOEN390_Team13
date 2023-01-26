import React from "react";
import NavBar from "../components/NavBar";
import background from "../assets/undraw_login_re_4vu2.svg"
import "../styles/components/Login.css"
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Grid } from "@material-ui/core";

function MainTitle(props) {
  return (
    <>
      <NavBar />
      <div className="background-color">
        <div className="background" style={{ 
        backgroundImage: `url(${background})` 
        }}>
          <Container maxWidth="sm">
            Email Address
          <TextField
            autoFocus
            className="inputRounded"
            margin="dense"
            label="Email Address"
            type="email"
            variant="outlined"
            size="small"
          />
          </Container>

          <div></div>
          <span>
            Password
          </span>
          <TextField className="inputRounded"
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            variant="outlined"
            size="small"
          />
        </div>
      </div>
    </>
  );
}

export default MainTitle;
