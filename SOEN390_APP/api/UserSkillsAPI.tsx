import axios from "axios";
import api from "../config.json";

export async function GetUserSkills(data:any) {
  try {
    const response = await axios.get(api.BACKEND_API + "/skill/get/" + data);

    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

export async function RemoveUserSkills(data:string) {
  try {
    const response = await axios.post(api.BACKEND_API + "/skill/remove/" + data);
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

export async function PostUserSkills(ownerID:any, name:string) {
  try {
    const response = await axios.post(api.BACKEND_API + "/skill/" + ownerID, {
        name: name,
    });

    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
}