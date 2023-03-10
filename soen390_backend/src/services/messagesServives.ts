import { error } from "console";
import firebase from "firebase";
import "firebase/storage";
import {
  chatMessage,
  messagesListElement,
  conversationListElement,
} from "../models/Messages";
const db = firebase.firestore();
//const ref = firebase.storage().ref();

//  dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815"))

// This is a helper function that takes an array of string IDs and sorts them in ascending order using bubble sort algorithm.
// The function mutates the original array and returns it sorted.
const orderIds = (arr: string[]): string[] => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

// This method finds a user in the Firestore database collection "users" using the user's email address.
// It takes in the email as a string and a callback function to handle the result.
// If a user with the provided email is found, the callback function is called with the user's data as an argument.
// If a user with the provided email is not found, the callback function is called with a null argument.
// If there is an error getting the user document, an error is thrown.
const findUserWithEmail = (email: string, callback: (data: any) => void) => {
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        let data = processData(snapshot);
        callback(data);
      } else {
        callback(null);
      }
    })
    .catch((error) => {
      console.log("Error getting the document:", error);
      throw new Error(error.message);
    });
};

// This function processes the snapshot returned from Firebase and extracts the data and id of the first document in the array.
// It returns an object with the extracted data and id. If the data is null, it logs an error and throws an exception.
function processData(snapshot: any) {
  let data = snapshot.docs.map((doc: { data: () => any; id: string }) => ({
    data: doc.data(),
    id: doc.id,
  }));
  if (data !== null) {
    return data[0];
  } else {
    console.log("ERROR");
    throw error;
  }
}

// This is an async function that fetches the conversation between users with the specified user IDs from the Firestore database.
// It searches the "conversations" collection in the database and filters for documents where the "userArray" field matches the specified user IDs.
// The function returns an array of conversation objects, where each object contains the conversation data and ID.
async function fetchConversation(userIds: string[]) {
  try {
    let conversation = await db
      .collection("conversations")
      .where("userArray", "==", userIds)
      .get();

    //let b: any =conversation.data()

    //let c:any = b["messages"]

    //let d = await c[0].get()

    let convo = conversation.docs.map(
      (doc: { data: () => any; id: string }) => ({
        data: doc.data(),
        id: doc.id,
      })
    );

    return convo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Creates a new conversation document in the database with the given user IDs and an empty messages array.
 * @param userIds An array of user IDs to include in the conversation.
 * @returns A promise that resolves to the newly created conversation document.
 */
async function createConversation(
  userIds: string[]
): Promise<firebase.firestore.DocumentData> {
  try {
    const conversationData = await db.collection("conversations").add({
      messages: [],
      userArray: userIds,
    });

    if (!conversationData) {
      throw new Error("Failed to create conversation.");
    }

    return conversationData;
  } catch (error) {
    console.error(`Failed to create conversation: ${(error as Error).message}`);
    throw error;
  }
}

export async function initiateConversation(userEmails: string[]) {
  let userList = true;
  try {
    let userIds: string[] = new Array();
    for (var i = 0; i < userEmails.length; i++) {
      var sender: any;

      sender = await new Promise((resolve, _) => {
        findUserWithEmail(userEmails[i], (user) => {
          // console.log(user);
          if (user == null) {
            resolve(null);
          } else {
            resolve(user);
          }
        });
      });

      if (sender.data) {
        userIds.push(sender.data["userID"]);
      }
    }
    userIds = orderIds(userIds);

    let conversationFound: any = await fetchConversation(userIds);

    //check for duplicates:
    let findDuplicates = (arr: string[]) =>
      arr.filter((item, index) => arr.indexOf(item) != index);

    if (conversationFound.length > 0 || findDuplicates(userIds).length > 0) {
      userList = false;
      throw new Error();
    }

    createConversation(userIds);
  } catch (error) {
    throw new Error("Error in initiateConversation");
  }
  console.log(userList);
  return userList;
}

/**
 * Sends a chat message to a group of users.
 * @param senderEmail The email address of the user sending the message.
 * @param userEmails An array of email addresses of the conversation thne user is included.
 * @param message The content of the chat message.
 * @returns A promise that resolves to true if the message was sent successfully.
 */
export async function sendMessage(
  senderEmail: string,
  userEmails: string[],
  message: string
) {
  try {
    //fetch the ids of each user email

    let userIds: string[] = new Array();
    for (var i = 0; i < userEmails.length; i++) {
      var anUser: any;
      console.log(userEmails[i]);

      anUser = await new Promise((resolve, _) => {
        findUserWithEmail(userEmails[i], (user) => {
          // console.log(user);
          if (user == null) {
            resolve(null);
          } else {
            resolve(user);
          }
        });
      });

      if (anUser.data) {
        userIds.push(anUser.data["userID"]);
      }
    }
    userIds = orderIds(userIds);
    console.log(userIds);

    const conversation = await fetchConversation(userIds);

    let conversationId: string;

    if (conversation.length === 0) {
      // If no conversation exists, create a new one
      const newConversation = await createConversation(userIds);
      conversationId = newConversation.id;
    } else if (conversation.length === 1) {
      // If a conversation exists, use the existing one
      conversationId = conversation[0].id;
    } else {
      // If multiple conversations exist, throw an error
      throw new Error("Multiple conversations found.");
    }

    // retrive sender email
    let sender: any;
    sender = await new Promise((resolve, _) => {
      findUserWithEmail(senderEmail, (user) => {
        // console.log(user);
        if (user == null) {
          resolve(null);
        } else {
          resolve(user);
        }
      });
    });

    let chat: chatMessage = {
      content: message,
      isRead: false,
      senderId: sender.data["userID"] as string,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      type: "text",
    };

    var document = await db.collection("chats").add(chat);

    console.log(document.id);

    // add the chat ref to the conversation entity

    await db
      .collection("conversations")
      .doc(conversationId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(
          db.doc("chats/" + document.id)
        ),
      });

    return true;
  } catch (error) {
    console.error(`Error occurred in sendMessage: ${error}`);
    throw error;
  }
}


/**

Asynchronously retrieves any new messages sent to a conversation and marks them as read for the recipient.

@param senderEmail - The email address of the sender of the messages

@param userEmails - An array of email addresses of the users participating in the conversation

@param messagesLength - The length of the message array last retrieved by the recipient

@returns - An array of messages that were sent after the messagesLength index, wrapped in a messagesListElement object containing the email of the sender and the message content

or an empty array if there are no new messages to retrieve or if there was an error
*/

export async function getUpdatedMessages(
  senderEmail: string,
  userEmails: string[],
  messagesLength: number
) {
  try {
    // get user ids from the array of

    let userIds: string[] = new Array();

    for (var i = 0; i < userEmails.length; i++) {
      var anUser: any;
      console.log(userEmails[i]);

      anUser = await new Promise((resolve, _) => {
        findUserWithEmail(userEmails[i], (user) => {
          // console.log(user);
          if (user == null) {
            resolve(null);
          } else {
            resolve(user);
          }
        });
      });

      if (anUser.data) {
        userIds.push(anUser.data["userID"]);
      }
    }
    userIds = orderIds(userIds);

    let conversation = await fetchConversation(userIds);

    if (conversation.length != 1) {
      return [];
    }
    // fetch the sender userID from the database
    let sender: any;
    sender = await new Promise((resolve, _) => {
      findUserWithEmail(senderEmail, (user) => {
        // console.log(user);
        if (user == null) {
          resolve(null);
        } else {
          resolve(user);
        }
      });
    });

    let messagesRef = conversation[0].data["messages"];

    if (messagesRef.length == messagesLength) {
      return [];
    }
    var listOfMessages: messagesListElement[] = [];

    for (var i = messagesLength; i < messagesRef.length; i++) {
      let snapShot: any = await messagesRef[i].get();
      let chat: chatMessage = snapShot.data() as chatMessage;

      //if its not the owner of the sent mesage set the read flag to true
      if (chat.senderId != sender.data["userID"] && chat.isRead == false) {
        chat.isRead = true;
        await db.collection("chats").doc(snapShot.id).update({
          isRead: true,
        });
      }

      //convert to readable Date javascript object for timestamp
      chat.timestamp = (
        chat.timestamp as firebase.firestore.Timestamp
      ).toDate();

      //populates the return message list:
      var messageWrapper: messagesListElement = {
        email: senderEmail,
        message: chat,
      };
      listOfMessages.push(messageWrapper);
    }
    return listOfMessages;
  } catch (error) {
    console.error(`Error occurred in sendMessage: ${error}`);
    throw error;
  }
}

export async function getActiveConversations(email: string) {
  try {
    // retrive sender email
    let sender: any;
    sender = await new Promise((resolve, _) => {
      findUserWithEmail(email, (user) => {
        // console.log(user);
        if (user == null) {
          resolve(null);
        } else {
          resolve(user);
        }
      });
    });

    // fetch the conversation og the active user
    let conversation = await db
      .collection("conversations")
      .where("userArray", "array-contains", sender.data["userID"])
      .get();

    let convo = conversation.docs.map(
      (doc: { data: () => any; id: string }) => ({
        data: doc.data(),
        id: doc.id,
      })
    );

    console.log(convo);

    let conversationList: conversationListElement[] = [];

    for (var i = 0; i < convo.length; i++) {
      let msgToFetch = convo[i].data["messages"].length;
      if (msgToFetch > 0) {
        msgToFetch = msgToFetch - 1;

        let messageRef = await convo[i].data["messages"][msgToFetch].get();
        let element: conversationListElement = {
          ActiveUser: convo[i].data["userArray"],
          message: messageRef.data() as chatMessage,
        };
        conversationList.push(element);
      } else {
        let element: conversationListElement = {
          ActiveUser: convo[i].data["userArray"],
          message: null,
        };
        conversationList.push(element);
      }
    }

    return conversationList;
  } catch (error) {
    console.error(`Error occurred in conversation list: ${error}`);
    throw error;
  }
}
