import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { createReport } from "../api/reportsApi";

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: 12,
    border: "2px solid #6C63FF", // Add purple outline
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "12px 12px 0 0",
    padding: theme.spacing(2),
    "& button": {
      color: "#000",
    },
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    padding: theme.spacing(1, 2),
  },
  button: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    borderRadius: 12,
    display: "block",
    "&:hover": {
      backgroundColor: "rgba(108, 99, 255, 0.25)", // Background color with 25% opacity
      borderColor: "#6C63FF", // Outline
    },
  },
  activeButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const ReportModal = (props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = async (event) => {
    const message = event.currentTarget.innerText;
    setActiveButton(message);
    console.log(message);
    const reporterID = window.location.pathname.split("/").pop();

    await createReport(reporterID, props.userID, message);
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="report-issue-dialog-title"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">Let us know what the issue is</Typography>
        <Button onClick={props.onClose}>X</Button>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="subtitle1">
          Our admins will have a look.
        </Typography>
        <Button
          variant="outlined"
          className={`${classes.button} ${
            activeButton === "It’s a spam or a scam" ? classes.activeButton : ""
          }`}
          onClick={handleButtonClick}
        >
          It’s a spam or a scam
        </Button>
        <Button
          variant="outlined"
          className={`${classes.button} ${
            activeButton === "It’s inappropriate" ? classes.activeButton : ""
          }`}
          onClick={handleButtonClick}
        >
          It’s inappropriate
        </Button>
        <Button
          variant="outlined"
          className={`${classes.button} ${
            activeButton === "It’s harassment" ? classes.activeButton : ""
          }`}
          onClick={handleButtonClick}
        >
          It’s harassment
        </Button>
        <Button
          variant="outlined"
          className={`${classes.button} ${
            activeButton === "It’s something else" ? classes.activeButton : ""
          }`}
          onClick={handleButtonClick}
        >
          It’s something else
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
