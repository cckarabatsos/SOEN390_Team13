import React from "react";
import NavBar from "../components/NavBar";
import background from "../assets/undraw_online_resume_re_ru7s.png"

import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { Grid } from "@material-ui/core";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import "../styles/components/SignUp.css";

const Signup = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };  

  return (
    <>
    <NavBar />    
      <div className="signup-color">           
        <div className="signup" style={{           
        backgroundImage: `url(${background})` 
        }}>          
          <Container maxWidth="sm">
  <div>
    <h1>Sign Up</h1>
    <div>
      <div className="form-group">
    <b>First Name</b>
      <TextField      
        autoFocus
        className="Roundedinput"
        margin="dense"
        label="First Name"
        type="name"
        variant="outlined"
        size="small"
      />
      </div>
    </div>
    <div>
      <div className="form-group">
      <b>Last Name</b>
      <TextField
        className="Roundedinput"
        autoFocus
        margin="dense"
        label="Last Name"
        type="name"
        variant="outlined"
        size="small"
      />
      </div>
    </div>
    <div>
      <div className="form-group">
      <b>Email Address</b>
      <TextField
        className="Roundedinput"
        autoFocus
        margin="dense"
        label="Email Address"
        type="email"
        variant="outlined"
        size="small"
      />
      </div>
    </div>
    <div>
      <div className="form-group">
      <b>Create Password</b>
      <TextField
        className="Roundedinput"
        autoFocus
        margin="dense"
        label="Create Password"
        type="password"
        variant="outlined"
        size="small"
      />
      </div>
    </div>
    <div>
      <div className="form-group">
      <b>Confirm Password</b>
      <TextField
        className="Roundedinput"
        autoFocus
        margin="dense"
        label="Confirm Password"
        type="password"
        variant="outlined"
        size="small"
      />
      </div>
    </div>
    <div>
      <Button onClick={handleClose} className="Roundedinput">Cancel</Button>
      <Button onClick={handleClose}>Sign Up</Button>
    </div>
    <div>
      <Button onClick={handleClose}>Sign Up With Google</Button>
    </div>
  </div>
</Container>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </>
  )
}

export default Signup