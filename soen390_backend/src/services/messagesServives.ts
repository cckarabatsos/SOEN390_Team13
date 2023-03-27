import firebase from "firebase";
import "firebase/storage";
import {
  chatMessage,
  messagesListElement,
  conversationListElement,
} from "../models/Messages";
const db = firebase.firestore();
//const ref = firebase.storage().ref();

//dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815"))

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
    throw new Error("V=cannot fetch the conversation data from the database");
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
    //check if user exist in the database first

    for (var i = 0; i < userIds.length; i++) {
      var doc = await db.collection("users").doc(userIds[i]).get();
      if (!doc.data()) {
        throw new Error("The user Ids are not registered in the database!");
      }
    }

    const conversationData = await db.collection("conversations").add({
      messages: [],
      userArray: userIds,
    });
    await conversationData.update({ conversationID: conversationData.id });

    if (!conversationData) {
      throw new Error("Failed to create conversation.");
    }

    return conversationData;
  } catch (error) {
    console.error(`Failed to create conversation: ${(error as Error).message}`);
    throw error;
  }
}
/**
 * Initiate a conversation between two users
 * @param userIds
 * @returns UserList
 */
export async function initiateConversation(userIds: string[]) {
  let userList = true;
  try {
    userIds = orderIds(userIds);

    //check if the userIds receives are already in the user database
    for (var i = 0; i < userIds.length; i++) {
      var doc = await db.collection("users").doc(userIds[i]).get();
      if (!doc.data()) {
        throw new Error("The user Ids are not registered in the database!");
      }
    }

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
    throw new Error(
      "Error in initiateConversation " + (error as Error).message
    );
  }
  console.log(userList);
  return userList;
}

/**
 * Sends a chat message to a group of users.
 *@param senderId - The user Id of the sender of the messages
 * @param userIds - An array of Ids of the users participating in the conversation
 * @param message The content of the chat message.
 * @returns A promise that resolves to true if the message was sent successfully.
 */
export async function sendMessage(
  senderId: string,
  userIds: string[],
  message: string
) {
  try {
    userIds = orderIds(userIds);
    console.log(userIds);

    //check for duplicates:
    let findDuplicates = (arr: string[]) =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    if (findDuplicates(userIds).length > 0) {
      throw new Error("There are dupplicate ids in the userId List received!");
    }

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

    //check if senderId is in the user database
    var doc = await db.collection("users").doc(senderId).get();
    if (!doc.data()) {
      throw new Error("The senderId are not registered in the database!");
    }

    let chat: chatMessage = {
      content: message,
      isRead: false,
      senderId: senderId as string,
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
    throw new Error(`Error occurred in sendMessage: ${error}`);
  }
}

/**

Asynchronously retrieves any new messages sent to a conversation and marks them as read for the recipient.

@param senderId - The user Id of the sender of the messages

@param userIds - An array of Ids of the users participating in the conversation

@param messagesLength - The length of the message array last retrieved by the recipient

@returns - An array of messages that were sent after the messagesLength index, wrapped in a messagesListElement object containing the email of the sender and the message content

or an empty array if there are no new messages to retrieve or if there was an error
*/

export async function getUpdatedMessages(
  senderId: string,
  userIds: string[],
  messagesLength: number
) {
  try {
    //check if the userIds receives are already in the user database
    for (var i = 0; i < userIds.length; i++) {
      var doc = await db.collection("users").doc(userIds[i]).get();
      if (!doc.data()) {
        throw new Error("The user Ids are not registered in the database!");
      }
    }

    //check if the  senderId is already in the user database
    var doc = await db.collection("users").doc(senderId).get();
    if (!doc.data()) {
      throw new Error("The senderId are not registered in the database!");
    }

    userIds = orderIds(userIds);

    let conversation: any = await fetchConversation(userIds);

    if (conversation.length != 1) {
      return [];
    }
    console.log(conversation[0].id);
    let messagesRef = conversation[0].data["messages"];

    if (messagesRef.length == messagesLength) {
      return [];
    }
    var listOfMessages: messagesListElement[] = [];

    for (var i = messagesLength; i < messagesRef.length; i++) {
      let snapShot: any = await messagesRef[i].get();
      let chat: chatMessage = snapShot.data() as chatMessage;

      //if its not the owner of the sent mesage set the read flag to true
      if (chat.senderId != senderId && chat.isRead == false) {
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
        Id: senderId,
        message: chat,
      };
      listOfMessages.push(messageWrapper);
    }
    const conversationID = conversation[0].id;
    return { listOfMessages, conversationID };
  } catch (error) {
    console.error(`Error occurred in sendMessage: ${error}`);
    throw new Error(
      `Error occurred in GetUpdatedMessages in messagesServices: ${error}`
    );
  }
}
/**
 * Get all the active conversations of a certain user
 * @param userId userID of a certain user
 * @param returnEmail
 * @returns the conversation list of the active user
 */
export async function getActiveConversations(
  userId: string,
  returnEmail: boolean
) {
  try {
    //check if the userId is already in the user database
    var doc = await db.collection("users").doc(userId).get();
    if (!doc.data()) {
      throw new Error("The userId are not registered in the database!");
    }

    // fetch the conversation of the active user
    let conversation = await db
      .collection("conversations")
      .where("userArray", "array-contains", userId)
      .get();

    let convo = conversation.docs.map(
      (doc: { data: () => any; id: string }) => ({
        data: doc.data(),
        id: doc.id,
      })
    );

    console.log(convo);

    let conversationList: conversationListElement[] = [];

    //var tempArray=[]

    for (var i = 0; i < convo.length; i++) {
      let msgToFetch = convo[i].data["messages"].length;
      if (msgToFetch > 0) {
        msgToFetch = msgToFetch - 1;

        let messageRef = await convo[i].data["messages"][msgToFetch].get();
        let element: conversationListElement = {
          ActiveUser: convo[i].data["userArray"],
          message: messageRef.data() as chatMessage,
        };
        if (returnEmail) {
          var temp: any;
          var tempArray = [];

          for (var j = 0; j < element.ActiveUser.length; j++) {
            temp = await db
              .collection("users")
              .doc(element.ActiveUser[j])
              .get();
            //temp= element.ActiveUser[j]
            tempArray.push(temp.data()["email"]);
          }
          element.ActiveUser = tempArray;
        }
        conversationList.push(element);
      } else {
        let element: conversationListElement = {
          ActiveUser: convo[i].data["userArray"],
          message: null,
        };
        if (returnEmail) {
          var temp: any;
          var tempArray = [];

          for (var j = 0; j < element.ActiveUser.length; j++) {
            temp = await db
              .collection("users")
              .doc(element.ActiveUser[j])
              .get();
            tempArray.push(temp.data()["email"]);
          }
          element.ActiveUser = tempArray;
        }
        conversationList.push(element);
      }
    }

    return conversationList;
  } catch (error) {
    throw new Error(`Error occurred in GetActiveConversation list: ${error}`);
  }
}
