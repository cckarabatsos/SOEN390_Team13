import axios from "axios";
import api from "../config.json";

export async function addExperience(userID, atPresent, startDate, endDate, company, position, type){
    console.log(atPresent);
    console.log(company);
    console.log(position);
    console.log(startDate);
    console.log(endDate);
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
                console.log(res);
                console.log(res.data);
                return res.data;
            });
        return response;
    } catch (err) {
        console.error(err);
    }
}

// export async function getExperience(userID){
//     try{
//         const response = await axios
//             .get(api.BACKEND_API + "/experience/get/" + userID)
//     }catch(err){
//         console.error(err);
//     }
// }