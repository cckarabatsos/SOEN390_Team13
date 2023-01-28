import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

function AddEducationDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AddIcon className="add-icon" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Skill</DialogTitle>
        <DialogContentText style={{ marginLeft: "5%" }}>
          What are your skills?
        </DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            className="inputRounded"
            margin="dense"
            label="Skill"
            type="skill"
            variant="outlined"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="button"
            variant="contained"
            style={{
              borderRadius: 27,
              backgroundColor: "rgba(100, 69, 227, 0.85)",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="button"
            variant="contained"
            style={{
              borderRadius: 27,
              backgroundColor: "rgba(100, 69, 227, 0.85)",
            }}
            onClick={handleClose}
          >
            Save and Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEducationDialog;
