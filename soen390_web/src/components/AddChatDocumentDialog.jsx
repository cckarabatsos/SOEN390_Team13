import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/Drawer.css";
import FileList from "./FileList";
import FileUploadChat from "./FileUploadChat";

function AddChatDocumentsDialog({ reqUserID, reqSenderID, conversationID }) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setFileData();
  };

  const [files, setFiles] = useState([]);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

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
        <DialogTitle>{"Send your File here"}</DialogTitle>
        <DialogContentText style={{ marginLeft: "5%" }}>
          {t("SentenceText")}
        </DialogContentText>
        <DialogContent>
          <div className="App">
            <div className="title">{t("UpFileText")}</div>
            <FileUploadChat
              reqUserID={reqUserID}
              reqSenderID={reqSenderID}
              conversationID={conversationID}
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
            {t("CancelText")}
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
            {t("SaveApplyText")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddChatDocumentsDialog;
