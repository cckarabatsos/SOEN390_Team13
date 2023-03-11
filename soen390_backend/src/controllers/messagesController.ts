import dotenv from "dotenv";
import {
  initiateConversation,
  sendMessage,
  getMessages,
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

export async function GetAllMessages(
  senderEmail: string,
  usersEmail: string[]
) {
  let messagesList: any;
  try {
    messagesList = (await getMessages(
      senderEmail,
      usersEmail
    )) as messagesListElement[];
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  return [200, messagesList];
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

  return [200, messagesList];
}

export async function GetActiveConversations(email: string) {
  let messagesList: any;
  try {
    messagesList = (await getActiveConversations(
      email
    )) as conversationListElement[];
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  console.log(messagesList)
  return [200, messagesList];
}
