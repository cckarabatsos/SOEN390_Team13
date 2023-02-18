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
    return false;
  }
}
