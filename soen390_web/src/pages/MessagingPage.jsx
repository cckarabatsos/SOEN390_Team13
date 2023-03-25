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
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getActiveConvos,
    getAllMessages,
    sendMessage,
} from "../api/messagesApi";
import { findUserById } from "../api/UserProfileApi";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
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
        backgroundColor: "#9993FF",
        alignSelf: "flex-start", // Align received messages to the left side
        marginBottom: "8px",
        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
    },
    sentMessage: {
        alignSelf: "flex-end", // Align sent messages to the right side
        backgroundColor: "#EDEDED",
        color: "black",
        borderRadius: "16px",
        padding: "8px",
        maxWidth: "80%",
        marginBottom: "8px",
        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
    },
    messagesContainer: {
        overflowY: "auto",
        paddingBottom: theme.spacing(1),
    },
    refreshButton: {
        marginTop: theme.spacing(1),
    },
    refreshButtonContainer: {
        marginTop: "8px",
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
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);
    const intervalId = useRef(null);
    const [conversationID, setConversationID] = useState("");
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        const convos = await getActiveConvos(props.userData.userID);
        setUsers(convos);
    }
    const fetchConversation = async (userId) => {
        try {
            if (userId) {
                console.log("checking messages");
                const user = await findUserById(userId);
                setSelectedUser(user.data);
                const activeMessages = await getAllMessages(
                    props.userData.userID,
                    user.data.userID
                );
                if (!activeMessages.data.usersChat.listOfMessages) {
                    setConversation([]);
                }
                setConversation(
                    activeMessages.data.usersChat.listOfMessages.map(
                        (chat) => chat.message
                    )
                );
                setConversationID(activeMessages.data.usersChat.conversationID);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     const userId = window.location.pathname.split("/").pop();
    //     fetchConversation(userId);
    // }, [location.pathname]);

    useEffect(() => {
        // Only run this effect once when the component is mounted
        if (selectedUser && !conversationID) {
            console.log("Fetch conversation 1");
            fetchConversation(selectedUser.userID);
        }

        // Set up the listener for the selected conversation
        const messageRef = conversationID
            ? collection(db, "conversations", conversationID, "messages")
            : null;
        if (messageRef) {
            const unsubscribe =
                messageRef &&
                onSnapshot(messageRef, (querySnapshot) => {
                    console.log("New message received");
                    const messages = querySnapshot.docs.map((doc) =>
                        doc.data()
                    );
                    setConversation(messages);
                });

            // Clean up the listener when the component unmounts or when a new conversation is selected
            return () => {
                unsubscribe && unsubscribe();
            };
        }
    }, [selectedUser]);

    const handleUserClick = (user) => {
        console.log(user.ActiveUser);
        navigate(`/Messages/${user.ActiveUser.userID}`);
        setSelectedUser(user.ActiveUser);
        console.log(selectedUser);
    };
    // const handleConversationChange = (conversationID) => {
    //     console.log(conversationID);
    //     setConversationID(conversationID);
    // };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        console.log(`Sending message "${message}" to ${selectedUser.name}`);
        await sendMessage(selectedUser.userID, props.userData.userID, message);
        setMessage("");
        //  fetchConversation(selectedUser.userID); // Refresh the conversation after sending the message
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
                            key={user.ActiveUser.userID}
                            selected={
                                selectedUser &&
                                user.ActiveUser.userID === selectedUser.userID
                            }
                            onClick={() => handleUserClick(user)}
                        >
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.ActiveUser.name}
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
                        <Box
                            display="flex"
                            flexGrow={1}
                            flexDirection="column"
                            className={classes.messagesContainer}
                        >
                            {conversation.map((message, index) => (
                                <Box
                                    key={index}
                                    className={`${classes.messageContainer} ${
                                        message.senderId ===
                                        props.userData.userID
                                            ? classes.sentMessage
                                            : classes.message
                                    }`}
                                >
                                    <Typography>{message.content}</Typography>
                                    <Typography variant="caption">
                                        {new Date(
                                            message.timestamp
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                        {new Date(
                                            message.timestamp
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box className={classes.messageInputContainer}>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleSendMessage(event);
                                }}
                                style={{ display: "flex", width: "100%" }}
                            >
                                <TextField
                                    id="message-input"
                                    label="Type a message"
                                    variant="outlined"
                                    fullWidth
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
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
                            </form>
                        </Box>
                        <Box className={classes.refreshButtonContainer}>
                            <Button
                                variant="contained"
                                color="default"
                                fullWidth // Make the button take the full width
                                className={classes.refreshButton}
                                onClick={() => {
                                    // Refresh conversations here
                                    fetchConversation(selectedUser.userID);
                                }}
                            >
                                Refresh Conversations
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
