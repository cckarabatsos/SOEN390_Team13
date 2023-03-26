import axios from "axios";
import api from "../config.json";

export async function UserConnectAPI(emailReceiver: String, emailSender: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/sendInvite", {
      params: {
        receiverEmail: emailReceiver,
        senderEmail: emailSender
      },
    });


    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function followCompanyAPI(emailReceiver: String, emailSender: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/follow", {
      params: {
        receiverID: emailReceiver,
        senderID: emailSender
      },
    });
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function unfollowCompanyAPI(emailReceiver: String, emailSender: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/unfollow", {
      params: {
        receiverID: emailReceiver,
        senderID: emailSender
      },
    });
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}