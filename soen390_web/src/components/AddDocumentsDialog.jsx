import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import "../styles/components/Drawer.css";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

function AddDocumentsDialog() {
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

  console.log(files);

  return (
    <>
      <IconButton
        data-testid="document-dialog-button"
        style={{ display: "inline-block" }}
        onClick={handleClickOpen}
      >
        <AddIcon className="add-icon" />
      </IconButton>
      <Dialog data-testid="dialog-box" open={open} onClose={handleClose}>
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
              removeFile={removeFile}
            />
            <FileList files={files} removeFile={removeFile} />
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

export default AddDocumentsDialog;
