import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllMessages, sendMessage } from "../api/messagesApi";
import { findUserById } from "../api/UserProfileApi";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "40%",
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
  conversation: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
    marginBottom: "8px",
  },
  message: {
    maxWidth: "80%",
    padding: "8px",
    borderRadius: "16px",
    backgroundColor: "#F5F5F5",
    alignSelf: "flex-start",
    marginBottom: "8px",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
  },
  sentMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5F5",
    color: "white",
    borderRadius: "16px",
    padding: "8px",
    maxWidth: "80%",
    marginBottom: "8px",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
  },

  messageInputContainer: {
    display: "flex",
    marginTop: "8px",
  },
  messageInput: {
    flexGrow: 1,
    marginRight: "8px",
  },
}));

function Messages(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

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
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userId = window.location.pathname.split("/").pop();
      console.log(userId);
      const user = await findUserById(userId);
      console.log(props.userData.email);
      const activeMessages = await getAllMessages(
        props.userData.email,
        user.data.email
      );
      console.log(activeMessages.data.usersChat);

      // set the value of conversation to the usersChat array
      setConversation(
        activeMessages.data.usersChat.map((chat) => chat.message)
      );
      console.log(user);
      setSelectedUser(user.data);
    }

    fetchData();
  }, [location.search, users]);

  const handleUserClick = (user) => {
    navigate(`/Messages/${user.id}`);
    setSelectedUser(user);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    console.log(`Sending message "${message}" to ${selectedUser.name}`);
    const response = await sendMessage(
      props.userData.email,
      selectedUser.email,
      message
    );
    console.log(response);
    const newMessage = {
      sender: props.userData.email,
      recipient: selectedUser.email,
      text: message,
      timestamp: new Date(),
    };
    setConversation([...conversation, newMessage]);
    setMessage("");
  };

  return (
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
            <Box display="flex" flexGrow={1} flexDirection="column">
              {conversation.map((message, index) => (
                <Box
                  key={index}
                  className={`${classes.messageContainer} ${
                    message.sender === props.userData.email
                      ? classes.sentMessage
                      : classes.message
                  }`}
                >
                  <Typography>{message.content}</Typography>
                  <Typography variant="caption">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {new Date(message.timestamp).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box className={classes.messageInputContainer}>
              <TextField
                id="message-input"
                label="Type a message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={classes.messageInput}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!message.trim()}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="subtitle1">
            Please select a user to start a conversation.
          </Typography>
        )}
      </main>
    </div>
  );
}

export default Messages;
