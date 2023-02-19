import axios from "axios";
import api from "../config.json";

export async function UpoadSingleFile(userID: String, file: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/uploadAccountFile/:userID", {
      params: {
        userID: userID,
        type: file
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