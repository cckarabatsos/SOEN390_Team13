import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";



export async function getJobSuggestions(userID) {
  try {
    const response = await axios.get(api.BACKEND_API + '/jobposting/getJobSuggestions/'
      + userID
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}