import express from "express";

import dotenv from "dotenv";
import {
  createNewConversationController,
  SendNewMessage,
  GetUpdatedMessages,
  GetActiveConversations,
} from "../controllers/messagesController";
const messages = express.Router();
messages.use(express.json());
dotenv.config();

// This route will be used to create a new conversation between 2 or more users
// receives an array of user email addresses
// output true if the conversation was sucessfully created
messages.get("/createConversation", async (req, res) => {
  console.log("in createConversation");
  console.log(req);
  try {
    const userEmails: string[] = JSON.parse(req.query.emails as string);

    if (userEmails.length < 2) {
      return res.status(400).json({
        message: "Please provide at least 2 user emails",
      });
    }
    const jobPostings = "hello 1";
    await createNewConversationController(userEmails);
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

// this route will be used to return the list of messages within a conversatiuon entity.
// receives the email address of the conversatiuon entity
//outputs the list of messages along with their sender email address
messages.get("/getAllMessages", async (req, res) => {
  try {
    const userEmails: string[] =
      typeof req.query.userEmails === "string"
        ? JSON.parse(req.query.userEmails)
        : req.query.userEmails;
    const senderEmail = req.query.senderEmail as string;

    if (!userEmails) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    const usersChat = await GetUpdatedMessages(senderEmail, userEmails, 0);
    return res.status(200).json({
      message: "Messages retrieved successfully",
      usersChat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// This route will be used to update the current conversation with missing messages that are in the database but not received by the client yet.
// It receives the current messages length and the list of emails of the conversation entity, and outputs the missing messages along with the respective sender email address.
messages.get("/updateMessages", async (req, res) => {
  try {
    // Extract the required data from the request query
    const userEmails: string[] = JSON.parse(req.query.userEmails as string);
    const senderEmail = req.query.senderEmail as string;
    const messagesLength: number = parseInt(req.query.messagesLength as string);
    // Validate the input
    if (!userEmails || !senderEmail || messagesLength < 0) {
      return res.status(400).json({
        message: "Please provide all required data",
      });
    }

    // Get the missing messages from the database
    const missingMessages = await GetUpdatedMessages(
      senderEmail,
      userEmails,
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
    const senderEmail = req.query.senderEmail as string;
    const emails: string[] = JSON.parse(req.query.emails as string);
    const message = req.query.message as string;
    console.log(message);
    // Error detection for missing or invalid inputs
    if (
      !emails ||
      !message ||
      !senderEmail ||
      !Array.isArray(emails) ||
      emails.length < 2
    ) {
      return res.status(400).json({
        message:
          "Please provide a valid sender email address, all emails in the conversation, and a non-null message",
      });
    }

    const messageConfirmation = await SendNewMessage(
      senderEmail,
      emails,
      message
    );
    return res.status(200).json({
      message: "Message sent successfully",
      messageConfirmation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

messages.get("/getActiveConversation", async (req, res) => {
  try {
    const email = req.query.email as string;
    const returnEmail = req.query.returnEmail as string;

    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    var activeConvos: any;
    if (returnEmail == "true") {
      activeConvos = await GetActiveConversations(email, true);
    } else {
      activeConvos = await GetActiveConversations(email, false);
    }

    return res.status(200).json({
      message: "Messages retrieved successfully",
      activeConvos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
module.exports = messages;
