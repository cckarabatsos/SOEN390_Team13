import axios from "axios";
import api from "../config.json";

export async function GetUsersAPI(data:any) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/search", {
      params: {
        filter: data
      },
    });
    return response.data[1];
  } catch (error) {
    console.log("error", error);
    return false;
  }
}