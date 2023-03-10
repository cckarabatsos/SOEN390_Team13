import axios from "axios";
import api from "../config.json";

export async function GetFile(userid:string, type:string) {
  try {
    if (typeof userid !== "undefined") {
      //console.log(userid);
      //console.log(type);
      const response = await axios.get(
        `${api.BACKEND_API}/user/accountFile/${userid}?type=${type}`
      );
      //console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    }
  } catch (err) {
    console.error("error", err);
    return false;
  }
}
