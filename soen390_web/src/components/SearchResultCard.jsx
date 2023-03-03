import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, Avatar } from "@material-ui/core";
import { sendInvite } from "../api/userNetworkingApi";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
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

const SearchResultCard = ({ data }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const { t } = useTranslation();
  const sendConnection = async (email) => {
    const personalData = JSON.parse(localStorage.getItem("isAuth"));
    console.log(email);
    console.log(personalData.email);
    const temp = await sendInvite(personalData.email, email);
    console.log(temp);
    const alertSeverity = temp ? "success" : "error";
    const alertMessage = temp
    ? "Connection request sent!"
    : "Failed to send connection request";
      //? '${t("ConnectionRequestText")}'
      //: '${t("FailedConnectionRequestText")};'
    setAlert({ open: true, severity: alertSeverity, message: alertMessage });
    setTimeout(() => {
      setAlert({ ...alert, open: false });
    }, 3000);
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Profile Picture"
              src={data.imageUrl}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${data.currentPosition}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${data.bio}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${data.contacts ? data.contacts.length : "No"} Connections`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.connectButton}
              onClick={() => sendConnection(`${data.email}`)}
            >
             {t("ConnectText")}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.viewProfileButton}
            >
              {t("ViewProfileText")}
            </Button>
            <Alert
              severity={alert.severity}
              onClose={handleClose}
              open={alert.open}
              className={classes.alert}
            >
              {alert.message}
            </Alert>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

SearchResultCard.defaultProps = {
  data: {
    imageUrl: "",
    name: "",
    workPosition: "",
    address: "",
    connections: "",
  },
};

export default SearchResultCard;
