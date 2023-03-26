import axios from "axios";
import api from "../config.json";

export async function GetNotification(userId) {
  try {
    const response = await axios.get(
      api.BACKEND_API + '/notification/getNotifications/'+userId
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

export async function removeNotification(notificationId){
    try {
        const response = await axios.get(
          api.BACKEND_API + '/notification/remove/'+notificationId
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