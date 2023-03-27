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

const UserConnection = () => {
  const [userData, setUseData] = React.useState({});

  const [users, setUsers] = useState([]);

  const [currentEmail, setCurrentEmail] = useState("");
  const { t } = useTranslation();
  const getInvitations = async (email) => {
    var responce = await GetPendingInvitations(email);
    console.log(responce);
    setUsers(responce);
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
          <Grid container spacing={2}>
            {users.map((aUser) => (
              <Grid item xs={6}>
                <UserConnectionComponent
                  image={aUser.image}
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
          </Grid>
        </div>
      </>
    </div>
  );
};

export default UserConnection;
