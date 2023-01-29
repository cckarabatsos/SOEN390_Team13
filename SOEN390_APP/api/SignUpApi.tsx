import React from "react";
import axios from "axios";
import { ISignUpUser } from "../Models/UsersModel";
import api from "../config.json";

export async function UserSignUp(user: ISignUpUser) {
  try {
    const response = await axios.post(api.BACKEND_API + "/user/api/register", {
      email: user.email,
      password: user.password,
      name: user.name,
    });
    
    if(response.data.registeredUser){
      return response.data;

    }else
    {
      return false
    }
      
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
