import axios from "axios";
import api from "../config.json";

export async function addExperience(userID, atPresent, startDate, endDate, company, position, type){
    try {
        const response = await axios
            .post(api.BACKEND_API + "/experience/" + userID, {
                "atPresent": atPresent,
                "startDate": startDate,
                "endDate": endDate,
                "company": company,
                "position": position,
                "type": type
            })
            .then((res) => {
                return res.data;
            });
        return response;
    } catch (err) {
        console.error(err);
    }
}