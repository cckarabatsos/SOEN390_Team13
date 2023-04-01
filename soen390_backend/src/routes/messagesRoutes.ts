import express from "express";

import dotenv from "dotenv";
import {
    createNewConversationController,
    SendNewMessage,
    GetUpdatedMessages,
    GetActiveConversations,
    uploadChatFile,
    getConversationWithID,
} from "../controllers/messagesController";
import multer from "multer";
import { hasFile } from "../controllers/userControllers";
import { findConversationWithID } from "../services/messagesServices";
import * as crypto from "crypto";

const messages = express.Router();
messages.use(express.json());
dotenv.config();
var upload = multer({ storage: multer.memoryStorage() });

// This route will be used to create a new conversation between 2 or more users
// receives an array of user email addresses
// output true if the conversation was sucessfully created
messages.get("/createConversation", async (req, res) => {
    console.log("in createConversation");
    console.log(req);
    try {
        const userIds: string[] = JSON.parse(req.query.ids as string);

        if (userIds.length < 2) {
            return res.status(400).json({
                message: "Please provide at least 2 user emails",
            });
        }
        const jobPostings = "hello 1";
        await createNewConversationController(userIds);
        return res.status(200).json({
            message: "Conversation created successfully",
            jobPostings,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error: " + (error as Error).message,
        });
    }
});
messages.get("/id/:conversationID", async (req, res) => {
    let conversationID = req.params.conversationID;
    try {
        let data: any = await getConversationWithID(conversationID);
        res.status(data[0]);
        res.json(data[1]).end();
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

// this route will be used to return the list of messages within a conversatiuon entity.
// receives the email address of the conversatiuon entity
//outputs the list of messages along with their sender email address
messages.get("/getAllMessages", async (req, res) => {
    try {
        const userIds: string[] =
            typeof req.query.userIds === "string"
                ? JSON.parse(req.query.userIds)
                : req.query.userIds;
        const senderEmail = req.query.senderId as string;

        if (!userIds) {
            return res.status(400).json({
                message: "Please provide an email address",
            });
        }
        const usersChat = await GetUpdatedMessages(senderEmail, userIds, 0);
        return res.status(200).json({
            message: "Messages retrieved successfully",
            usersChat,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error: " + (error as Error).message,
        });
    }
});

// This route will be used to update the current conversation with missing messages that are in the database but not received by the client yet.
// It receives the current messages length and the list of emails of the conversation entity, and outputs the missing messages along with the respective sender email address.
messages.get("/updateMessages", async (req, res) => {
    try {
        // Extract the required data from the request query
        const userIds: string[] = JSON.parse(req.query.userIds as string);
        const senderId = req.query.senderId as string;
        const messagesLength: number = parseInt(
            req.query.messagesLength as string
        );
        // Validate the input
        if (!userIds || !senderId || messagesLength < 0) {
            return res.status(400).json({
                message: "Please provide all required data",
            });
        }

        // Get the missing messages from the database
        const missingMessages = await GetUpdatedMessages(
            senderId,
            userIds,
            messagesLength
        );

        // Return the missing messages
        return res.status(200).json({
            message: "Missing messages retrieved successfully",
            missingMessages,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error: " + (error as Error).message,
        });
    }
});
// This route is used to send a message within a conversation entity
// Input: the conversation entity members' list and the sender email.
// Output: a boolean value indicating whether the message was successfully sent or not.
messages.get("/sendMessage", async (req, res) => {
    try {
        const senderId = req.query.senderId as string;
        const Ids: string[] = JSON.parse(req.query.Ids as string);
        const message = req.query.message as string;
        let type: string = "text";
        if (req.query.type) {
            type = req.query.type as string;
        }
        console.log(message);
        // Error detection for missing or invalid inputs
        if (
            !Ids ||
            !message ||
            !senderId ||
            !Array.isArray(Ids) ||
            Ids.length < 2
        ) {
            return res.status(400).json({
                message:
                    "Please provide a valid sender Id address, all Ids in the conversation, and a non-null message",
            });
        }
        if (type === "document") {
            const regex =
                /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/soen-390-/;
            if (!regex.test(message)) {
                return res.status(400).json({
                    message:
                        "Invalid message format for document type. Please provide a valid URL starting with 'https://firebasestorage.googleapis.com/v0/b/soen-390-'",
                });
            }
        }

        const messageConfirmation = await SendNewMessage(
            senderId,
            Ids,
            message
        );
        return res.status(200).json({
            message: "Message sent successfully",
            messageConfirmation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: (error as Error).message,
        });
    }
});

messages.get("/getActiveConversation", async (req, res) => {
    try {
        const id = req.query.id as string;
        const returnEmail = req.query.returnEmail as string;
        if (!id) {
            return res.status(400).json({
                message: "Please provide an email address",
            });
        }
        var activeConvos: any;
        if (returnEmail == "true") {
            activeConvos = await GetActiveConversations(id, true);
        } else {
            activeConvos = await GetActiveConversations(id, false);
        }

        return res.status(200).json({
            message: "Messages retrieved successfully",
            activeConvos,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: (error as Error).message,
        });
    }
});
messages.post("/uploadChatFile", upload.single("file"), async (req, res) => {
    const senderID = req.query.senderId as string;
    const IDs: string[] = JSON.parse(req.query.Ids as string);
    const conversationID = req.query.conversationID as string;
    try {
        let status, data: any;
        if (hasFile(req)) {
            data = await uploadChatFile(
                senderID,
                IDs,
                req.file,
                conversationID
            );
        }
        status = data[0];
        if (status == 200) {
            res.sendStatus(200);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
const decryptDocument = async (
    encryptedUrl: any,
    conversationID: any,
    ivBase64: any
) => {
    try {
        const iv = Buffer.from(decodeURIComponent(ivBase64), "base64");
        console.log(iv);
        const conversation = await findConversationWithID(conversationID);

        if (!conversation) {
            throw new Error("Conversation not found");
        }

        const key = conversation.key;
        const keyBuffer = Buffer.from(key, "hex");
        console.log(keyBuffer);
        const decipher = crypto
            .createDecipheriv("aes-128-ecb", keyBuffer, null)
            .setAutoPadding(true); // enable auto padding

        const encryptedData = Buffer.from(encryptedUrl, "base64");
        console.log(encryptedData);
        const decrypted = Buffer.concat([
            decipher.update(encryptedData),
            decipher.final(),
        ]);
        console.log(decrypted.toString("utf-8"));

        return decrypted.toString("utf-8");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

messages.get("/downloadDocument", async (req, res) => {
    const encryptedUrl = req.query.encryptedUrl;
    const conversationID = req.query.conversationID;
    const ivBase64 = req.query.iv?.toString();

    if (!ivBase64) {
        res.status(400).send("Missing iv parameter");
        return;
    }

    try {
        const decryptedBuffer = await decryptDocument(
            encryptedUrl,
            conversationID,
            ivBase64
        );
        const decryptedString = decryptedBuffer.toString();
        res.setHeader("Content-Type", "text/plain");
        res.send(decryptedString);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error decrypting file");
    }
});

export default messages;
