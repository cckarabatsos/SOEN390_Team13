import axios from "axios";
import api from "../config.json";

export async function GetApplicationsHistory(userID:string) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/application/getApplicationHistory/" + userID,);

    return response.data;
  } catch (error) {
    console.error("error Application", error);
    return [];
  }
}

export async function RemoveApplication(userID:string, postingID:string) {
  try {
    const response = await axios.post(api.BACKEND_API + '/application/remove/' + userID + "?postingID=" + postingID);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}