import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";



export async function getAllApplication(userID) {
  try {
    const response = await axios.get(api.BACKEND_API + '/application/getApplicationHistory/'
      + userID
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function removeApplication(userID, postingID) {
  try {
    const response = await axios.post(api.BACKEND_API + '/application/remove/');
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export const handleWithdrawApplication = async (postingID) => {
  try {
    const data = JSON.parse(localStorage.getItem("isAuth"));
  
    let id = "5";
    if (data != null) {
      id = data.userID;
    }
    console.log(api.BACKEND_API + '/application/remove/' + id + "?postingID=" + postingID)
    const response = await axios.post(api.BACKEND_API + '/application/remove/' + id + "?postingID=" + postingID);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};