import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AcceptInvitations,
  DeclineInvitations,
  GetPendingInvitations,
} from "../api/userConectionApi";
import UserConnectionComponent from "../components/UserConectionComponent";
import "../styles/components/userconnection.css";
import CircularProgress from "@mui/material/CircularProgress";

const UserConnection = () => {
  const [userData, setUseData] = React.useState({});

  const [users, setUsers] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const [currentEmail, setCurrentEmail] = useState("");
  const { t } = useTranslation();
  const getInvitations = async (email) => {
    var responce = await GetPendingInvitations(email);
    console.log(responce);
    setUsers(responce);
    setLoadingState(false)
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUseData(JSON.parse(localStorage.getItem("isAuth")));
      setCurrentEmail(data.email);
    } else {
      setUseData(false);
    }
    getInvitations(data?.email);
  }, []);

  const handleAccept = async (curr, senderEmail) => {
    var success = await AcceptInvitations(senderEmail, curr);

    if (success) {
      getInvitations(currentEmail);
    } else {
      console.log("error processing invitation accept");
    }
  };

  const handleDecline = async (curr, senderEmail) => {
    var success = await DeclineInvitations(senderEmail, curr);

    if (success) {
      getInvitations(currentEmail);
    } else {
      console.log("error processing invitation decline");
    }
  };
  console.log(users.length);
  return (
    <div data-testid="userconnection-1">
      <>
        <h1 className="center" style={{
            fontWeight: "normal"
        }}>{t("RequestCenterText")}</h1>
        <div className="request-section">
          <Grid container spacing={2} 
  alignItems="center"
  justifyContent="center">
          {loadingState && <CircularProgress color="info" />}
            {users.map((aUser) => (
              <Grid item sm={6} xs={12}>
                <UserConnectionComponent
                  image={aUser.picture}
                  name={aUser.name}
                  job={aUser.currentPosition}
                  location={aUser.location}
                  currentEmail={currentEmail}
                  senderEmail={aUser.email}
                  accept={handleAccept}
                  decline={handleDecline}
                ></UserConnectionComponent>
              </Grid>

            ))}
            {users.length == 0 && !loadingState&&<h2>No connections request</h2>}
          </Grid>
        </div>
      </>
    </div>
  );
};

export default UserConnection;
