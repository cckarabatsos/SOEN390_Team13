import dotenv from "dotenv";
import { initiateConversation,sendMessage } from "../services/messagesServives";

dotenv.config();

export async function createNewConversationController(usersEmail: string[]) {
  console.log("in ctearet new conversation controller?");
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
    
    let confirmation=false;
  try {
    confirmation = await sendMessage(senderEmail, usersEmail,content) as boolean;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }

  return [200, confirmation];
}
