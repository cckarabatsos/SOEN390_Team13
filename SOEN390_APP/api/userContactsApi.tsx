import axios from "axios";
import api from "../config.json";

export async function GetContacts(email:string) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/user/api/getContacts",
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

export async function RemoveContact(emailSender: String, removedEmail: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/removeContact", {
      params: {
        removedEmail: removedEmail,
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

