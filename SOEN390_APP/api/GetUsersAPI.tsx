import axios from "axios";
import api from "../config.json";

export async function GetUsersAPI(data:any) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/search", {
      params: {
        filter: data
      },
    });
    return response.data[1];
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

export async function GetCompanyAPI(data:any) {
  console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/searchCompanies", {
      params: {
        filter: data
      },
    });
    return response.data[1];
  } catch (error) {
    console.log("error", error);
    return false;
  }
}

  export async function GetUserInfo(data:any) {
    try {
      const response = await axios.get(api.BACKEND_API + "/user/id/" + data);
      
      return response.data;
    } catch (error) {
      console.log("error", error);
      return false;
    }
}


