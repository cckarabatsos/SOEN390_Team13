import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/components/MessagingPage.css"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

function Messages() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const mockContacts = [
      {
        id: "1",
        name: "Alice",
        avatar: "https://i.pravatar.cc/150?img=1",
        status: "Online",
      },
      {
        id: "2",
        name: "Bob",
        avatar: "https://i.pravatar.cc/150?img=2",
        status: "Offline",
      },
      {
        id: "3",
        name: "Charlie",
        avatar: "https://i.pravatar.cc/150?img=3",
        status: "Online",
      },
      {
        id: "4",
        name: "Dave",
        avatar: "https://i.pravatar.cc/150?img=4",
        status: "Away",
      },
      {
        id: "5",
        name: "Eve",
        avatar: "https://i.pravatar.cc/150?img=5",
        status: "Online",
      },
    ];
    setUsers(mockContacts);
    // fetch("/api/users")
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  }, [location.search, users]);

  const handleUserClick = (user) => {
    navigate(`/Messages/${user.id}`);
    setSelectedUser(user);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    console.log(`Sending message "${message}" to ${selectedUser.name}`);
    setMessage("");
  };

  return (
    <div className="messagingpage">
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {users.map((user) => (
            <ListItem
              button
              key={user.id}
              selected={selectedUser && user.id === selectedUser.id}
              onClick={() => handleUserClick(user)}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={user.status}
                classes={{ primary: classes.listItemText }}
              />
              <ListItemIcon>
                <Badge color="secondary" variant="dot">
                  <Icon />
                </Badge>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedUser ? (
          <Box display="flex" flexDirection="column" height="100%">
            <Typography>{selectedUser.name}</Typography>
            <ListItemAvatar>
              <Avatar alt={selectedUser.name} src={selectedUser.avatar} />
            </ListItemAvatar>
            <Box flexGrow={1}>{/* Render message conversations */}</Box>
            <Box display="flex" mt={2}>
              <Box flexGrow={1}>
                <TextField
                  id="message-input"
                  label="Type a message"
                  variant="outlined"
                  fullWidth
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Box>
              <Box ml={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!message.trim()}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="subtitle1">
            Please select a user to start a conversation.
          </Typography>
        )}
      </main>
    </div>
    </div>
  );
}

export default Messages;
