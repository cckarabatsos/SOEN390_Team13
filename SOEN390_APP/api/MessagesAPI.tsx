import axios from "axios";
import api from "../config.json";


export async function CreateConversation(emailUser:string, emailContact:string) {
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/createConversation/", {
        params: {
          ids: JSON.stringify([emailUser, emailContact]),
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

    try {
      const response = await axios.get(
          api.BACKEND_API + "/messages/getAllMessages",
          {
              params: {
                  userIds: [emailUser, emailContact],
                  senderId: emailUser,
              },
          }
      );
      return response.data.usersChat;
  } catch (error) {
      console.error("error", error);
      return false;
  }
  }

  export async function SendMessage(emailUser:string, emailContact:string, message:string) {
    try {
      const response = await axios.get(api.BACKEND_API + "/messages/sendMessage/", {
        params: {
            Ids: JSON.stringify([emailUser, emailContact]),
            senderId: emailUser,
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
      const response = await axios.get(api.BACKEND_API + "/messages/getActiveConversation/", {
        params: {
          id: emailUser,
          returnEmail: false
        },
      });
      if (response.status == 200) {
        return response.data.activeConvos;
      } else {
        return response.data.activeConvos;
      }
    } catch (error) {
      console.error("error Remove Application", error);
    }
  }
