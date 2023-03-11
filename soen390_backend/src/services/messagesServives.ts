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

    db.collection("conversations")
      .add({
        messages: [],
        userArray: userIds,
      })
      .then(() => {
        console.log("Document successfully written!");
      });
  } catch (error) {
    throw new Error("Error in initiateConversation");
  }
  console.log(userList);
  return userList;
}

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

    //fetch the conversation in questiuon
    let conversation = await fetchConversation(userIds);

    if (conversation.length != 1) {
      throw new Error("cannot fecth coresponding conversation");
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
      .doc(conversation[0].id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(
          db.doc("chats/" + document.id)
        ),
      });

    console.log(conversation[0].id);
    return true;
  } catch (error) {
    console.log("error occured in sendMessage");
    throw new Error((error as Error).message);
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
