import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../styles/components/NotificationComponent.css";
import Delete from "@mui/icons-material/Delete";
import { ListItemSecondaryAction } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

export default function NotificationComponent(props) {
  const userImage = props.picture;
  const notificationCategory = props.notificationCategory;
  const notificationDescription = props.notificationDescription;

  var userName = props.userName;
  if (!userName) {
    userName = "Error";
  }
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={userName} src={userImage} />
      </ListItemAvatar>
      <ListItemText
        primary={notificationCategory}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {notificationCategory} from {userName}:
            </Typography>
            {" " + notificationDescription}
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          color="error"
          onClick={() => props.handleDelete(props.notificationId)}
        >
          <Delete></Delete>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
