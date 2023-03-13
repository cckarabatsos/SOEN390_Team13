import axios from "axios";
import api from "../config.json";

export async function addExperience(userID, atPresent, startDate, endDate, company, position, type){
    try {
        const response = await axios
            .post(api.BACKEND_API + "/experience/" + userID, {
                "atPresent": atPresent,
                "startDate": startDate,
                "endDate": endDate,
                "company": company,
                "position": position,
                "type": type
            })
            .then((res) => {
                return res.data;
            });
        return response;
    } catch (err) {
        console.error(err);
    }
}

export async function getExperience(userID, type) {
    try {
      const response = await axios.get(api.BACKEND_API + "/experience/get/" + userID + "?type=" + type);
      if (response.status === 200) {
        const data = await response.data; // wait for the data to resolve
        return data;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      throw err; // re-throw any caught errors for the calling function to handle
    }
  }

  export async function removeExperience(experienceID){
    try {
        const response = await axios
            .post(api.BACKEND_API + "/experience/remove/" + experienceID);
        return response;
    } catch (err) {
        console.error(err);
    }
  }
  
  