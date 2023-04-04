import axios from "axios";
import api from "../config.json";

export async function GetApplicationsHistory(userID:string) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/application/getApplicationHistory/" + userID,);

    return response.data;
  } catch (error) {
    console.error("error Application", error);
    return [];
  }
}

export async function RemoveApplication(userID:string, postingID:string) {
  try {
    const response = await axios.post(api.BACKEND_API + '/application/remove/' + userID + "?postingID=" + postingID);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function PostUserApplication(
  ownerID:any, 
  email:string, 
  firstName:string,
  lastName:string,
  phone:string,
  address:string,
  address2:string,
  city: string,
  area:string,
  province:string,
  school:string,
  schoolCountry: string,
  schoolDegree: string,
  schoolEnd:  string,
  schoolMajor:  string,
  timestamp:  string,
  postingID:  string,
  attachResume:  boolean,
  attachCoverLetter:  boolean,
  experience: string[],
  
  ) {
    
  try {
    const response = await axios.post(api.BACKEND_API + "/application/" + ownerID, {
     email:   email,
     firstName:   firstName,
     lastName: lastName,
     phone:  phone,
     address:  address,
     address2:  address2,
     city: city,
     area:  area,
     province: province,
     school:  school,
     schoolCountry: schoolCountry,
     schoolDegree: schoolDegree,
     schoolEnd:  schoolEnd,
     schoolMajor:  schoolMajor,
     timestamp:  timestamp,
     postingID:  postingID,
     attachResume:  attachResume,
     attachCoverLetter:  attachCoverLetter,
     experience: experience,
    });

    console.log(response)

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