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

export async function createNewConversationController(usersIds: string[]) {
    let success = false;
    try {
        success = await initiateConversation(usersIds);
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }

    return [200, success];
}

export async function SendNewMessage(
    senderId: string,
    usersIds: string[],
    content: string,
    type: string
) {
    let confirmation = false;
    try {
        confirmation = (await sendMessage(
            senderId,
            usersIds,
            content,
            type
        )) as boolean;
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }

    return [200, confirmation];
}

export async function GetUpdatedMessages(
    senderId: string,
    usersIds: string[],
    messagesLength: number
) {
    let messagesList: any;
    try {
        messagesList = (await getUpdatedMessages(
            senderId,
            usersIds,
            messagesLength
        )) as messagesListElement[];
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }

    return messagesList;
}

export async function GetActiveConversations(
    userId: string,
    returnEmail: boolean
) {
    let convoList: any;
    try {
        convoList = (await getActiveConversations(
            userId,
            returnEmail
        )) as conversationListElement[];
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    }

    return convoList;
}
