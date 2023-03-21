import axios from "axios";
import api from "../config.json";

export async function getAllMessages(reqUserEmail, reqSenderEmail) {
  try {
    console.log([reqUserEmail, reqSenderEmail]);
    const response = await axios.get(
      api.BACKEND_API + "/messages/getAllMessages",
      {
        params: {
          userEmails: [reqUserEmail, reqSenderEmail],
          senderEmail: reqSenderEmail,
        },
      }
    );
    console.log(response);
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
    console.log(response);
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
