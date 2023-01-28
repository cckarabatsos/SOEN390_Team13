import React from "react";
import axios from "axios";
import { ISignUpUser } from "../Models/UsersModel";
import api from "../config.json";

export async function UserSignUp(user: ISignUpUser) {
  try {
    console.log(user.name);
    console.log(user.email);
    const response = await axios.post(api.BACKEND_API + "/user/api/register", {
      email: user.email,
      password: user.password,
      name: user.name,
    });
    console.log(response.data.name);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
