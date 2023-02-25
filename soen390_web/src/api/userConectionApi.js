import axios from "axios";
import api from "../config.json";

export async function GetPendingInvitations(email) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/user/api/getPendingInvitations",
      {
        params: {
          userEmail: email,
        },
      }
    );
    return response.data[1];
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

export async function AcceptInvitations(senderEmail, receiverEmail) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/user/api/manageInvite",
      {
        params: {
          invitedEmail: receiverEmail,
          senderEmail: senderEmail,
          isAccept: "true",
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function DeclineInvitations(senderEmail, receiverEmail) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/user/api/manageInvite",
      {
        params: {
          invitedEmail: receiverEmail,
          senderEmail: senderEmail,
          isAccept: "false",
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
