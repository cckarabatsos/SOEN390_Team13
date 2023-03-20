import axios from "axios";
import api from "../config.json";

export async function GetMessages(reqUserEmail, reqSenderEmail) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/messages/getAllMessages",
      {
        params: {
          userEmail: reqUserEmail,
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
