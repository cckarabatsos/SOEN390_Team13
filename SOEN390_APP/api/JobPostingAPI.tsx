import axios from "axios";
import api from "../config.json";

export async function JobSearch(text:String) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/jobposting/filter/products",
      {
        params: {
          category: text,
          skip: "0",
          limit: "50",
        },
      }
    );
    return response.data[1];
  } catch (error) {
    console.error("error", error);
    return false;
  }
}