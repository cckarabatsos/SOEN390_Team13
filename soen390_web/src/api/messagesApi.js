import axios from "axios";
import api from "../config.json";
import { findUserById } from "./UserProfileApi";

export async function getAllMessages(reqUserEmail, reqSenderEmail) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/messages/getAllMessages",
      {
        params: {
          userEmails: [reqUserEmail, reqSenderEmail],
          senderEmail: reqSenderEmail,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
export async function sendMessage(reqUserEmail, reqSenderEmail, reqMessage) {
  try {
    const emails = JSON.stringify([reqUserEmail, reqSenderEmail]);
    const queryString = `senderEmail=${reqSenderEmail}&emails=${emails}&message=${reqMessage}`;

    const response = await axios.get(
      api.BACKEND_API + "/messages/sendMessage?" + queryString
    );
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function getActiveConvos(reqEmail) {
  try {
    const queryString = `email=${reqEmail}&returnEmail=false`;

    const response = await axios.get(
      api.BACKEND_API + "/messages/getActiveConversation?" + queryString
    );

    const activeConvos = response.data.activeConvos;

    const updatedActiveConvos = [];

    for (let i = 0; i < activeConvos.length; i++) {
      const userId = activeConvos[i].ActiveUser[0];

      const userDataResponse = await findUserById(userId);
      const userData = userDataResponse.data;

      activeConvos[i].ActiveUser = userData;

      updatedActiveConvos.push(activeConvos[i]);
    }
    return updatedActiveConvos;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
