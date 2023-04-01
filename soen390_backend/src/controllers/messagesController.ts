import dotenv from "dotenv";
import {
    initiateConversation,
    sendMessage,
    getUpdatedMessages,
    getActiveConversations,
    storeChatFile,
    findConversationWithID,
} from "../services/messagesServices";
import {
    messagesListElement,
    conversationListElement,
} from "../models/Messages";
import { conversationSchema } from "../models/conversation";
import * as crypto from "crypto";
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
    content: string
) {
    let confirmation = "";
    const type = "text";
    const iv = crypto.randomBytes(16);
    try {
        confirmation = (await sendMessage(
            senderId,
            usersIds,
            content,
            type,
            iv
        )) as string;
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

export async function uploadChatFile(
    senderID: string,
    IDs: string[],
    file: any,
    conversationID: string
) {
    let url = await storeChatFile(senderID, IDs, file, conversationID);
    console.log("File upload finished.");
    if (url === null) {
        return [404, { msg: "File storage failed." }];
    } else {
        return [200, url];
    }
}
export async function getConversationWithID(conversationID: string) {
    let conversation = await findConversationWithID(conversationID);
    let casted_conversation = await conversationSchema.cast(conversation);
    // console.log(casted_user);
    if (conversation) {
        return [200, casted_conversation];
    } else {
        return [404, { msg: "User not found" }];
    }
}
