import axios from "axios";
import api from "../config.json";

export async function GetContacts(email) {
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

export async function removeContact(senderEmail, removedEmail) {
 
  try {
    const response = await axios.get(
      
      api.BACKEND_API + "/user/api/removeContact",
      {
        params: {
          senderEmail: senderEmail,
          removedEmail: removedEmail,
        }
      }
    );
    if (response.status == 200){
      return true;
    } else {
      return false;
    };
  } catch (error) {
    console.error("error", error);
    return false;
  }
}