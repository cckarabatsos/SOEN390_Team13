import dotenv from "dotenv";
import { initiateConversation } from "../services/messagesServives";

dotenv.config(); 


export async function createNewConversationController(
    usersEmail: string[],
) {
    console.log("in ctearet new conversation controller?")
    let success=false
    console.log(usersEmail)
    try {
        success = await initiateConversation(usersEmail);
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }

    return [200, success];
}

