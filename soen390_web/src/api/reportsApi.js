import axios from "axios";
import api from "../config.json";

export async function getReports(reqUserId) {
  try {
    const response = await axios.get(
      `${api.BACKEND_API}/reports/batchReports?userID=${reqUserId}`
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function reportDecision(reqReportId, reqReportedId, reqDecision) {
  try {
    const response = await axios
      .post(`${api.BACKEND_API}/reports/verdictReport`, {
        reportID: reqReportId,
        reportedID: reqReportedId,
        banned: reqDecision,
      })
      .then((res) => {
        return res.data;
      });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
