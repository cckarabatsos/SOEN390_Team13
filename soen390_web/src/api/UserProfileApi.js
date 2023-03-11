import axios from "axios";
import api from "../config.json";

export async function addExperience(userID, atPresent, startDate, endDate, company, position, type){
    console.log(atPresent);
    console.log(company);
    console.log(position);
    console.log(startDate);
    console.log(endDate);
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
                console.log(res);
                console.log(res.data);
                return res.data;
            });
        return response;
    } catch (err) {
        console.error(err);
    }
}

export async function getExperience(userID, type) {
    try {
      console.log(api.BACKEND_API + "/experience/get/" + userID + "?type=" + type);
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
  
  