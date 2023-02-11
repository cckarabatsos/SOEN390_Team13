import React, { useState } from "react";
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
import { Select, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function AddEducationDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [files, setFiles] = useState([]);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  return (
    <>
      <IconButton style={{ display: "inline-block" }} onClick={handleClickOpen}>
        <AddIcon className="add-icon" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Personal Documents</DialogTitle>
        <DialogContentText style={{ marginLeft: "5%" }}>
          Upload your CV, Cover letter, or anything else you wish your
          recruiters to look at!
        </DialogContentText>
        <DialogContent>
          <div className="App">
            <div className="title">Upload file</div>
            <FileUpload
              files={files}
              setFiles={setFiles}
              // removeFile={removeFile}
            />
            {/* <FileList files={files} removeFile={removeFile} /> */}
          </div>
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
