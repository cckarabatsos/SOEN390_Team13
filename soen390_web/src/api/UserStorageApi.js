import axios from "axios";
import api from "../config.json";

export async function GetFile(userid, type) {
  try {
    console.log("user id: " + userid);
    if (typeof userid !== "undefined") {
      console.log(
        `${api.BACKEND_API}/user/accountFile/?${userid}?type=${type}`
      );
      const response = await axios.get(
        `${api.BACKEND_API}/user/accountFile/${userid}?type=${type}`
      );
      console.log(response);
      if (response.status === 200) {
        if(type == "picture")
        console.log("this is a picture:" + response.data);
        else
        console.log("this is not a picture:" + response.data);
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
