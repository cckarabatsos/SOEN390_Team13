import axios from "axios";
import api from "../config.json";

export async function getApplicationWithId(applicationId) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/application/id/" + applicationId
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateApplicationStatus(applicationId,status) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/application/updateStatus/" + applicationId,
      {
          params: {
              status: status,
          },
      }
    );
    if (response.status == 200) {
      return true
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}



