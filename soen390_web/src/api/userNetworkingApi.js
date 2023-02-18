import axios from "axios";
import api from "../config.json";

export async function searchInfo(reqType, reqTerm) {
  try {
    const response = await axios
      .get(api.BACKEND_API + "/user/api/search", {
        params: {
          name: reqType == "name" ? reqTerm : "",
          email: reqType == "email" ? reqTerm : "",
        },
      })
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.error("error from api call");
    return false;
  }
}
