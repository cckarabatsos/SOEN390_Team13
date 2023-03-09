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
  console.log("INSIDE REMOVEAPPLICTION" )
  console.log(userID, postingID)
  try {
    const response = await axios.post(api.BACKEND_API + "/application/remove/" + userID, {
      params: {
        postingID: postingID
      },
    });
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error Remove Application", error);
    return false;
  }
}