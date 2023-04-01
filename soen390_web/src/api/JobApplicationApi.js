import axios from "axios";
import api from "../config.json";

export async function createApplication(
  ownerID,
  email,
  firstName,
  lastName,
  phone,
  address,
  address2,
  city,
  area,
  province,
  school,
  schoolCountry,
  schoolDegree,
  schoolEnd,
  schoolMajor,
  attachResume,
  attachCoverLetter,
  experience,
  postingID
) {
  try {
    const response = await axios.post(
      api.BACKEND_API + "/application/" + ownerID,
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        area: area,
        province: province,
        school: school,
        schoolCountry: schoolCountry,
        schoolDegree: schoolDegree,
        schoolEnd: schoolEnd,
        schoolMajor: schoolMajor,
        attachResume: attachResume,
        attachCoverLetter: attachCoverLetter,
        experience: experience,
        postingID: postingID,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function getLastApplication(userID) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/application/getLastApplication/" + userID
    );
    return [response.status, response.data];
  } catch (error) {
    console.error("error", error);
    return [error.response.status, error.response.data];
  }
}
