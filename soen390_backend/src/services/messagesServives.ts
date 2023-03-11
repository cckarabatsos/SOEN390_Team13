import { error } from "console";
import firebase from "firebase";
import "firebase/storage";
import { chatMessage, messagesListElement } from "../models/Messages";
//import { type } from "os";
//import { User } from "../models/User";
//import { Conversation, conversation_schema } from "../models/Messages";
//import { Message } from "../models/Messages";
const db = firebase.firestore();
//const ref = firebase.storage().ref();

//  dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815"))


/*

to do:

in the "send message" function, correct the logic for the "wrap" variable.
Add extensive error checking and return a specific error type for each associated error.

*/


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
async function createConversation(userIds: string[]): Promise<firebase.firestore.DocumentData> {
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

export async function getMessages(senderEmail: string, userEmails: string[]) {
  console.log(userEmails);

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

    //fetch the conversation entity shared among the users

    let conversation = await fetchConversation(userIds);

    let messagesRef = conversation[0].data["messages"];
    console.log(sender.data["userID"]);

    var listOfMessages:messagesListElement[] = [];

    for (var i = 0; i < messagesRef.length; i++) {
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
      chat.timestamp = (chat.timestamp as firebase.firestore.Timestamp).toDate();

      //populates the return message list:
      var messageWrapper: messagesListElement={

        email:senderEmail,
        message:chat

      }
      listOfMessages.push(messageWrapper);
    }
    return listOfMessages;
  } catch (error) {
    throw new Error("Error in getMessages: " + (error as Error).message);
  }
}
