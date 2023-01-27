import React from "react";
import axios from "axios";
import { ILoginUser } from "../Models/UsersModel";
import api from "../config.json";

export async function UserLogin(user: ILoginUser) {
  try {

    console.log(api.BACKEND_API + `/user/api/login?email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`)
    console.log(user.email)
    console.log(user.password)

    //const result = await fetch(api.BACKEND_API + `/user/api/login?email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`,{
        //method: "GET",
       
    //});
    const response = await axios.get(api.BACKEND_API + "/user/api/login", {
        params: {
          email: user.email,
          password: user.password,
        },
      });
      console.log(response.data.name);
      return response.data;
    
    
    
    
    
  } catch (error) {
    console.log("error", error);
    return false;
  }
  return true;
}