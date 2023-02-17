import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";

export async function JobSearch(text, category){
    try {
        const response = await axios
          .get(api.BACKEND_API + "/user/api/login", {
            params: {
              category: category
            },
          })
          .then((res) => {
            return res;
          });
        return response;
      } catch (error) {
        console.error("error", error);
        return false;
      }
}