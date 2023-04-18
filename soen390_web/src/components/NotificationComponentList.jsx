import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import "../styles/components/NotificationComponent.css";

import NotificationComponent from "./NotificationComponent";
import { GetNotification, removeNotification } from "../api/NotificationsApi";

export default function NotificationComponentList(props) {
  const [notifications, setNotifications] = useState([]);
  const [userData, setUseData] = React.useState({});
  const [loadingState, setLoadingState] = useState(true);

  const getNotificationsList = async (userId) => {
    let generatedNotification = await GetNotification(userId);
    setNotifications(generatedNotification);
    console.log("hello")
    setLoadingState(false)
  };
  const handleRemoveNotification = async (notificationId) => {
    var response = await removeNotification(notificationId);
    if (response) {
      getNotificationsList(userData.userID);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUseData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      setUseData(false);
    }

    if (userData) {
      getNotificationsList(data.userID);
    }
  }, []);

  return (
    <div className="notificationContainer">
      <div className="notificationPageTitle">
        <h1>Notification Center</h1>
      </div>

      <div className="innerMiddleContainer">
      {loadingState && <CircularProgress color="info" />}
        {notifications.length > 0 && (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {notifications.map((aNotification) => (
              <>
                <NotificationComponent
                  userName="tomas"
                  notificationDescription={aNotification.message}
                  notificationCategory={aNotification.category}
                  picture={aNotification.logo}
                  handleDelete={handleRemoveNotification}
                  notificationId={aNotification.notificationID}
                ></NotificationComponent>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        )}
        {notifications.length == 0 && !loadingState&&<h2>No New Notification!</h2>}
      </div>
    </div>
  );
}
