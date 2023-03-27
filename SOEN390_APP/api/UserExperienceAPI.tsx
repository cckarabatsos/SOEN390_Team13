import axios from "axios";
import api from "../config.json";

export async function GetUserExperience(data:any, type:string) {
  try {
    const response = await axios.get(api.BACKEND_API + "/experience/get/" + data, {
      params: {
        type: type
      },
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

export async function RemoveUserExperience(data:string) {
  try {
    const response = await axios.post(api.BACKEND_API + "/experience/remove/" + data);
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

export async function PostUserExperience(ownerID:any, type:string, atPresent:boolean,startDate:string,endDate:string,company:string,position:string) {
  try {
    const response = await axios.post(api.BACKEND_API + "/experience/" + ownerID, {
        type: type,
        atPresent: atPresent,
        startDate: startDate,
        endDate: endDate,
        company: company,
        position: position
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