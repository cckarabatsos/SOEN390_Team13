import axios from "axios";
import api from "../config.json";

export async function GetNotification(userId:string) {
  try {
    const response = await axios.get(api.BACKEND_API + "/notification/getNotifications/" + userId);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function removeNotification(docID:string){
    try {
        const response = await axios.post(
          api.BACKEND_API + '/notification/remove/'+docID
        );

        if(response.status == 200){
            return true
        }
        else{
            return false
        }
      } catch (error) {
        console.error("error", error);
        return false
      }
}