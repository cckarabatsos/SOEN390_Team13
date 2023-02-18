import React from "react";
import axios from "axios";
import api from "../config.json";

export async function UserRequest(email: String) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/getPendingInvitations", {
      params: {
        userEmail: email,
      },
    });


    return response.data.data[1];
  } catch (error) {
    console.log("error", error);
    return false;
  }
}