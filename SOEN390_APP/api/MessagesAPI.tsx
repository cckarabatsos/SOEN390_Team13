import axios from "axios";
import api from "../config.json";


export async function CreateConversation(emailUser:string, emailContact:string) {
    //console.log("INSIDE create convo" )
    //console.log(emailUser, emailContact)
    //console.log(JSON.stringify([emailUser, emailContact]))
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/createConversation/", {
        params: {
            emails: JSON.stringify([emailUser, emailContact]),
        },
      });
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("error Remove Application", error);
      return false;
    }
  }

  export async function GetAllMessages(emailUser:string, emailContact:string) {
    //console.log("INSIDE messages" )
    //console.log(emailUser, emailContact)
    //console.log(JSON.stringify([emailUser, emailContact]))
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/getAllMessages/", {
        params: {
            userEmails: JSON.stringify([emailUser, emailContact]),
            senderEmail: emailUser
        },
      });
      if (response.status == 200) {
        return response.data.usersChat[1];
      } else {
        return response.data.usersChat[1];
      }
    } catch (error) {
      console.error("error Remove Application", error);
    }
  }

  export async function SendMessage(emailUser:string, emailContact:string, message:string) {
    //console.log("Message sent" )
    //console.log(emailUser, emailContact)
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/sendMessage/", {
        params: {
            emails: JSON.stringify([emailUser, emailContact]),
            senderEmail: emailUser,
            message: message
        },
      });
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("error Remove Application", error);
      return false;
    }
  }

  export async function GetActiveConversations(emailUser:string) {
    //console.log("INSIDE active convos" )
    //console.log(emailUser, emailContact)
    //console.log(JSON.stringify([emailUser, emailContact]))
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/getAllMessages/", {
        params: {
            email: emailUser
        },
      });
      console.log("------------------------" )
      console.log(response.data)
      console.log("------------------------" )
      if (response.status == 200) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("error Remove Application", error);
    }
  }
