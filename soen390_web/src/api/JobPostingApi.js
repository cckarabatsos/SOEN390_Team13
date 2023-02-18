import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import api from "../config.json";
import { auth, provider } from "../firebaseConfig";

export async function JobSearch(text, category){
    try {
        const response = await axios
          .get(api.BACKEND_API + "/jobposting/filter", {
            params: {
              category: text
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