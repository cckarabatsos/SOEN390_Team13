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

export const handleWithdrawApplication = async (userID, postingID) => {
  try {
    const response = await axios.post('/application/remove/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};