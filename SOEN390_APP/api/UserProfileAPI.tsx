import axios from "axios";
import api from "../config.json";

export async function UpoadSingleFile(userID: String, file: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/uploadAccountFile/:userID", {
      params: {
        userID: userID,
        type: file
      },
    });


    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
export async function editUserProfile(email: string, newProfile: any): Promise<any> {
  console.log(email)
  console.log(newProfile)
  try {
    const response = await axios.post(api.BACKEND_API + "/user/edit/" + email, newProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}