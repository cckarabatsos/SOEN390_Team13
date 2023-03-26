import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import "../styles/components/NotificationComponent.css";

import NotificationComponent from "./NotificationComponent";
import { GetNotification, removeNotification } from "../api/NotificationsApi";


export default function NotificationComponentList(props) {

  const[notifications, setNotifications]= useState([])
  const [userData, setUseData] = React.useState({});

  const getNotificationsList= async (userId)=>{
    let generatedNotification = await GetNotification(userId)
    console.log(generatedNotification)
    setNotifications(generatedNotification)

  }

  const handleRemoveNotification = async (notificationId) => {
    var response = await removeNotification(notificationId);
    if (response) {
      setNotifications([])
    }
    
  };

  useEffect( ()=>{

    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUseData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      setUseData(false);
    } 
    
    if(userData) {
      getNotificationsList(userData.userID)
    }
  },[])
 

  return (
    <div className="notificationContainer">
      <div className="notificationPageTitle">
        <h2>Notification Center</h2>
      </div>

      <div className="innerMiddleContainer">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>

          {notifications.map((aNotification)=>(
            <>
            <NotificationComponent
            userName="tomas"
            notificationDescription= {aNotification.message}
            notificationCategory = {aNotification.category}
            picture = {aNotification.logo}
            handledelete={handleRemoveNotification}
            notificationId= {aNotification.notificationID}
            ></NotificationComponent>
             <Divider variant="inset" component="li" />
            </>
            

          )
          
          
          )}
         
          
        </List>
      </div>
    </div>
  );
}
