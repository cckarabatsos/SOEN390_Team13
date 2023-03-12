import axios from "axios";
import api from "../config.json";

export async function getReports(reqUserId) {
  try {
    const response = await axios.get(
      `${api.BACKEND_API}/reports/batchReports?userID=${reqUserId}`
    );
    console.log("yo", response);
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
