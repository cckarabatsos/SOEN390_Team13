import axios from "axios";
import api from "../config.json";

export async function getApplicationWithId(applicationId) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/jobposting/id/" + applicationId
    );

    if (response.status == 200) {
      return response;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
