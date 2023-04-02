import axios from "axios";
import api from "../config.json";

export async function CompanyApi(category, text, skip, limite) {
  //Switch statement to check which category has been selected,
  //Make request to backend API to search for Compagies based on maes and companyt email
  //Includes a default case
  console.log(category + " " + text + " " + skip + " " + limite);
  switch (category) {
    case "name":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/user/api/searchCompanies",
          {
            params: {
              name: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return false;
      }
    case "email":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/user/api/searchCompanies",
          {
            params: {
              email: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return false;
      }
  }
}

export async function FollowCompany(userId, companyId) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/follow", {
      params: {
        senderID: userId,
        receiverID: companyId,
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function UnfollowCompany(userId, companyId) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/unFollow", {
      params: {
        senderID: userId,
        receiverID: companyId,
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}


