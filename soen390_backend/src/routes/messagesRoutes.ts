import express from "express";

import dotenv from "dotenv";
import { createNewConversationController } from "../controllers/messagesController";
const messages = express.Router();
messages.use(express.json());
dotenv.config();


// This route will be used to create a new conversation between 2 or more users
// receives an array of user email addresses
// output true if the conversation was sucessfully created
messages.get("/createConversation", async (req, res) => {
    console.log("in createConversation");

  try {
    const userEmails:string[] = JSON.parse(req.query.emails as string);

    //console.log(userEmails)
    
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
      message: "Internal server error: "+ (error as Error).message
    });
  }
});


// this route will be used to return the list of messages within a conversatiuon entity.
// receives the email address of the conversatiuon entity
//outputs the list of messages along with their sender email address
messages.get("/getAllMessages", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    const jobPostings = "hello 2";
    return res.status(200).json({
      message: "Messages retrieved successfully",
      jobPostings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// this route will be used to update the curent conversation with mising messages that are in the database but not received on the front end yet
// receive the cuttent messages lenth and the list of emails of the conversatiuon entity
//outputs the missing messages along with their sender email address
messages.get("/updateMessages", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    const jobPostings = "hello 3";
    return res.status(200).json({
      message: "Messages retrieved successfully",
      jobPostings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
// this reoute will be use to send a massage within the conversatiuon entity
//input: receive the converdation entity members list and the sender email.
// output the boolean true of false depoending if the message was sucessfully sent
messages.post("/sendMessage", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    const jobPostings =  "hello 4";
    return res.status(200).json({
      message: "Message sent successfully",
      jobPostings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// this route will freat the last messafe if a conversation. can be used as thumbnails
// receives as input the list of user within the conversation
// output the content of the last recorded messages in the conversation
messages.get("/getMessages", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address",
      });
    }
    const jobPostings =  "hello 5";
    return res.status(200).json({
      message: "Messages retrieved successfully",
      jobPostings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = messages;


