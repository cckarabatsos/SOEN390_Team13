import dotenv from "dotenv";
import {
  initiateConversation,
  sendMessage,
  getUpdatedMessages,
  getActiveConversations,
} from "../services/messagesServives";
import {
  messagesListElement,
  conversationListElement,
} from "../models/Messages";

dotenv.config();

export async function createNewConversationController(usersEmail: string[]) {
  let success = false;
  console.log(usersEmail);
  try {
    success = await initiateConversation(usersEmail);
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  return [200, success];
}

export async function SendNewMessage(
  senderEmail: string,
  usersEmail: string[],
  content: string
) {
  let confirmation = false;
  try {
    confirmation = (await sendMessage(
      senderEmail,
      usersEmail,
      content
    )) as boolean;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  return [200, confirmation];
}


export async function GetUpdatedMessages(
  senderEmail: string,
  usersEmail: string[],
  messagesLength: number
) {
  let messagesList: any;
  try {
    messagesList = (await getUpdatedMessages(
      senderEmail,
      usersEmail,
      messagesLength
    )) as messagesListElement[];
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  return messagesList;
}

export async function GetActiveConversations(email: string, returnEmail:boolean) {
  let convoList: any;
  try {
    convoList = (await getActiveConversations(
      email,returnEmail
    )) as conversationListElement[];
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }




  return convoList;
}
