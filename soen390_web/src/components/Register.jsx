import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { Link } from "react-router-dom";

function Register() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Register
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New User</DialogTitle>
          
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstname"
              label="FistName"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastname"
              label="LastName"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          />
          </DialogContent>
          <DialogContentText>
            <Link to={"/login"}>Already have an account? Login Here!</Link>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Register</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default Register