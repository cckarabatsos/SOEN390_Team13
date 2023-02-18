import axios from "axios";
import api from "../config.json";

export async function searchInfo(reqType, reqTerm) {
  try {
    const response = await axios
      .get(api.BACKEND_API + "/api/search", {
        params: {
          type: reqType,
          term: reqTerm,
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
