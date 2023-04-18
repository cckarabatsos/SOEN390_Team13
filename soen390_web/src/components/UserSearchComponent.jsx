import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sendInvite } from "../api/userNetworkingApi";
import "../styles/components/UserSearchComponent.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "2%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginRight: theme.spacing(2),
    borderRadius: "50%",
    border: "2px solid white",
  },
  connectButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  viewProfileButton: {
    marginTop: theme.spacing(2),
  },
  alert: {
    margin: "3% 0",
  },
}));

export default function UserSearchComponent(props) {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const classes = useStyles();
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const sendConnection = async (email) => {
    const personalData = JSON.parse(localStorage.getItem("isAuth"));
    const temp = await sendInvite(personalData.email, email);
    const alertSeverity = temp ? "success" : "error";

    // ? "Connection request sent!"
    // : "Failed to send connection request";
    const alertMessage = temp
      ? `${t("ConnectionRequestText")}`
      : `${t("FailedConnectionRequestText")}`;
    setAlert({ open: true, severity: alertSeverity, message: alertMessage });
    setTimeout(() => {
      setAlert({ ...alert, open: false });
    }, 3000);
  };

  return (
    <div key={props.id} className="UserContainer">
      <div className="innerContainerCompany">
        <div className="logoContainer">
          <img src={props.image} alt="logo" class="logoCompany"></img>
        </div>

        <div className="titleContainer">
          <div className="button-viewprofile-position">
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={() => navigate("/UserProfile/" + props.id)}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {t("MoreInfoText")}
            </Button>
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={() => navigate("/Messages/" + props.id)}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {t("Message")}
            </Button>
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={() => sendConnection(`${props.email}`)}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {console.log(props)}
              {t("Connect")}
            </Button>
            <Alert
              severity={alert.severity}
              
              open={alert.open}
              className={classes.alert}
            >
              {alert.message}
            </Alert>
          </div>
          <div className="companyName">{props.name}</div>
          {props.contact && (
            <div className="companyFollowers">
              {props.contact.length} Connections
            </div>
          )}
          <div className="companySubName">{props.position}</div>
          <div className="companySubName">{props.company}</div>
        </div>
      </div>
    </div>
  );
}