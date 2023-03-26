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
    CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    getActiveConvos,
    getAllMessages,
    sendMessage,
} from "../api/messagesApi";
import { findUserById } from "../api/UserProfileApi";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { async } from "@firebase/util";
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
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useParams();
    useEffect(() => {
        setIsLoading(true);
        fetchData();
        fetchConversation(userId);
    }, [userId]);
    useEffect(() => {
        if (!conversationID) {
            console.log("Ignoring subscription");

            return;
        }
        console.log(
            "Running subscription for conversationID: ",
            conversationID
        );
        const messageRef = doc(db, "conversations", conversationID);
        const unsub = onSnapshot(messageRef, (querySnapshot) => {
            fetchConversation(userId);
        });

        return () => {
            console.log("Unsubbing");

            unsub();
        };
    }, [conversationID]);
    async function fetchData() {
        const convos = await getActiveConvos(props.userData.userID);

        const convUser = convos.find(
            (user) => user.ActiveUser.userID === userId
        );

        setSelectedUser(convUser);
        setUsers(convos);
    }
    const fetchConversation = async (userId) => {
        try {
            if (userId) {
                const user = await findUserById(userId);
                const activeMessages = await getAllMessages(
                    props.userData.userID,
                    user.data.userID
                );
                setConversation(
                    activeMessages.data.usersChat.listOfMessages.map(
                        (chat) => chat.message
                    )
                );

                setConversationID(activeMessages.data.usersChat.conversationID);
                setIsLoading(false);
            }
        } catch (error) {}
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        await sendMessage(userId, props.userData.userID, message);
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
                            key={user.ActiveUser.userID}
                            selected={user.ActiveUser.userID === userId}
                            onClick={() =>
                                navigate(`/Messages/${user.ActiveUser.userID}`)
                            }
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
                {isLoading && !selectedUser && <CircularProgress />}
                {selectedUser ? (
                    <Box
                        position="relative"
                        display="flex"
                        flexDirection="column"
                        height="100%"
                    >
                        <Typography>{selectedUser.name}</Typography>
                        {isLoading ? (
                            <CircularProgress position="absolute" />
                        ) : (
                            <Box
                                display="flex"
                                flexGrow={1}
                                flexDirection="column"
                                className={classes.messagesContainer}
                            >
                                {conversation.map((message, index) => (
                                    <Box
                                        key={index}
                                        className={`${
                                            classes.messageContainer
                                        } ${
                                            message.senderId ===
                                            props.userData.userID
                                                ? classes.sentMessage
                                                : classes.message
                                        }`}
                                    >
                                        <Typography>
                                            {message.content}
                                        </Typography>
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
                        )}
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
                                    disabled={!message.trim() || isLoading}
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
                        Please select a valid user to start a conversation.
                    </Typography>
                )}
            </main>
        </div>
    );
}

export default Messages;
