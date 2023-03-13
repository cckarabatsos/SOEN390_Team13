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
