import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Dialog, DialogContent,
} from "@material-ui/core";
import {Button} from "@mui/material";
import { makeStyles, } from "@material-ui/core/styles";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getActiveConvos,
  getAllMessages,
  sendMessage,
  handleDocumentDecrypt,
  createConversation,
} from "../api/messagesApi";
import { findUserById } from "../api/UserProfileApi";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ReportModal from "../components/ReportModal";
import AddChatDocumentsDialog from "../components/AddChatDocumentDialog";
import AddConversationModal from "../components/AddConversationModal";
import Tooltip from '@mui/material/Tooltip';


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
  const [conversationID, setConversationID] = useState("");
  const intervalId = useRef(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [conversationVersion, setConversationVersion] = useState(0); // Add this state variable
  const [descModalOpen, setDescModalOpen] = useState(false)


  const handleOpenDescModal = () => {
    setDescModalOpen(true);
  };
  
  const handleCloseDescModal = () => {
    setDescModalOpen(false);
  };
  

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    fetchConversation(userId);
  }, [userId]);

  useEffect(() => {
    const userId = window.location.pathname.split("/").pop();
    fetchConversation(userId);
  }, [location.pathname, conversationVersion]); // Use conversationVersion as a dependency

  // ...

  const handleSendMessage = async (event) => {
    event.preventDefault();
    await sendMessage(userId, props.userData.userID, message);
    const conversationFetched = await fetchConversation(userId);
    if (conversationFetched) {
      setConversationVersion(conversationVersion + 1); // Increment conversationVersion to trigger a re-render
    }
    setMessage("");
  };

  const fetchConversation = async (userId) => {
    try {
      if (userId) {
        //const user = await findUserById(userId);
        var activeMessages = await getAllMessages(
          userId,
          props.userData.userID
        );
        console.log(activeMessages.data.usersChat)

        
          setConversation(
            activeMessages.data.usersChat.map(
              (chat) => chat.message
            )
          );
      
        setConversationID(activeMessages.data.conversationID);
        setIsLoading(false);
        return true; // Return true if the conversation was fetched successfully
      }
    } catch (error) {
      

      console.log("error" + error.message);
      return false; // Return false if there was an error fetching the conversation
    }
  };

  // ...

  useEffect(() => {
    async function handleConversation() {
      if (!conversationID) {
        const userId = window.location.pathname.split("/").pop();

        const newConvoStatus = await createConversation([
          props.userData.userID,
          userId,
        ]);
        await fetchData(); // Make sure fetchData is awaited
        setIsLoading(false); // Set isLoading to false after fetchData
        //console.log("Ignoring subscription");

        return;
      }
      //console.log("Running subscription for conversationID: ", conversationID);
      const messageRef = doc(db, "conversations", conversationID);
      const unsub = onSnapshot(messageRef, (querySnapshot) => {
        fetchConversation(userId);
      });

      return () => {
        //console.log("Unsubbing");

        unsub();
      };
    }

    handleConversation();
  }, [conversationID]);

  async function fetchData() {
    const convos = await getActiveConvos(props.userData.userID);

    console.log(convos)

    const convUser = convos.find((user) => user.ActiveUser.userID == userId);

    setSelectedUser(convUser);
    setUsers(convos);
  }
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReportClick = (userID) => {
    //console.log("Report clicked for user:", userID);
    setShowReportModal(true);
    handleMenuClose();
  };

  const handleReportModalClose = () => {
    setShowReportModal(false);
  };

  const handleDocumentDecryptButton = async (content, conversationID) => {
    try {
      //console.log(content);
      const decryptedUrl = await handleDocumentDecrypt(content, conversationID);
      //console.log(decryptedUrl);
      window.open(decryptedUrl, "_blank");
    } catch (error) {
      console.error("Error while decrypting file: ", error);
    }
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
             <Tooltip title={user.ActiveUser.name}>

<ListItem
              style={{
                cursor: "pointer",
              }}
              key={user.ActiveUser.userID}
              selected={user.ActiveUser.userID === userId}
              onClick={() => navigate(`/Messages/${user.ActiveUser.userID}`)}
            >
              <ListItemAvatar>
                <Avatar alt={user.ActiveUser.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.ActiveUser.name}
                secondary={user.status}
                classes={{ primary: classes.listItemText }}
              />
              <IconButton onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => handleReportClick(user.ActiveUser.userID)}
                >
                  Report
                </MenuItem>
              </Menu>
              <ReportModal
                open={showReportModal}
                onClose={handleReportModalClose}
                handleReportClick={handleReportClick}
                userID={user.ActiveUser.userID}
              />
            </ListItem>



             </Tooltip>
           
          ))}
        </List>
        <Button color="info"  variant="contained" style={{width:"90%", marginLeft:"auto",marginRight:"auto"}} onClick={()=>{setDescModalOpen(true)}}> Create conversation </Button>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {isLoading && !selectedUser && <CircularProgress />}
        {selectedUser ? (
          <Box display="flex" flexDirection="column" height="100%">
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
                    className={`${classes.messageContainer} ${
                      message.senderId === props.userData.userID
                        ? classes.sentMessage
                        : classes.message
                    }`}
                  >
                    {message.type === "text" ? (
                      <Typography>{message.content}</Typography>
                    ) : message.type === "document" ? (
                      <Box className={classes.documentContainer}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleDocumentDecryptButton(
                              message.content,
                              conversationID,
                              message.filename,
                              message.iv
                            )
                          }
                          className={classes.documentDecryptButton}
                        >
                          Decrypt Document
                        </Button>
                      </Box>
                    ) : null}
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
            )}
            <Box className={classes.messageInputContainer}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSendMessage(event);
                }}
                style={{ display: "flex", width: "100%" }}
              >
                <AddChatDocumentsDialog
                  reqUserID={userId}
                  reqSenderID={props.userData.userID}
                  conversationID={conversationID}
                />

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
                  disabled={!message.trim() || isLoading}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </form>
            </Box>
            {/* <Box className={classes.refreshButtonContainer}>
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
                        </Box> */}
          </Box>
        ) : (
          <Typography variant="subtitle1">
            Please select a user to start a conversation.
          </Typography>
        )}
      </main>

      <Dialog open={descModalOpen} onClose={handleCloseDescModal} fullWidth
  maxWidth="sm">
        <DialogContent>
          <AddConversationModal handleCloseModal={handleCloseDescModal} userData={props.userData} selectedUser={selectedUser} ></AddConversationModal>
          <Button onClick={handleCloseDescModal}>{"cancel"}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Messages;
