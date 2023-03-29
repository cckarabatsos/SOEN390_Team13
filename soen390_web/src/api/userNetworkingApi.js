import axios from "axios";
import api from "../config.json";

export async function searchUsers(reqType, reqTerm) {
  try {
    const response = await axios
      .get(api.BACKEND_API + "/user/api/search", {
        params: {
          name: reqType === "name" ? reqTerm : "",
          email: reqType === "email" ? reqTerm : "",
        },
      })
      .then((res) => {
        return res;
      });
    return response.data[1];
  } catch (error) {
    console.error("error from api call");
    return false;
  }
}
export async function sendInvite(userEmail, targetEmail) {
  try {
    const response = await axios
      .get(api.BACKEND_API + "/user/api/sendInvite", {
        params: {
          receiverEmail: targetEmail,
          senderEmail: userEmail,
        },
      })
      .then((res) => {
        return true;
      });
    return response;
  } catch (error) {
    return false;
  }
}
