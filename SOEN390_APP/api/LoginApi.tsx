import React from "react";
import axios from "axios";
import { ILoginUser } from "../Models/UsersModel";
import api from "../config.json";

export async function UserLogin(user: ILoginUser) {
  try {
    const response = await axios.get(api.BACKEND_API + "/user/api/login", {
      params: {
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
}
