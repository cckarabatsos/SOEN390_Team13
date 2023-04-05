import axios from "axios";
import api from "../config.json";

export async function JobSearch(category, text) {
  //switch statement to check which category has been selected,
  //make request to backend API to search for jobs based on location,
  // company, position, type, remote
  // includes a default case
  switch (category) {
    case "location":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/jobposting/filter/products",
          {
            params: {
              location: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return [];
      }
    case "company":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/jobposting/filter/products",
          {
            params: {
              company: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return [];
      }
    case "position":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/jobposting/filter/products",
          {
            params: {
              position: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return [];
      }
    case "type":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/jobposting/filter/products",
          {
            params: {
              type: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return [];
      }
    case "remote":
      try {
        const response = await axios.get(
          api.BACKEND_API + "/jobposting/filter/products",
          {
            params: {
              remote: text,
              skip: "0",
              limit: "10",
            },
          }
        );
        console.log(response.data[1]);
        return response.data[1];
      } catch (error) {
        console.error("error", error);
        return [];
      }

    default:
      console.error("Invalid category specified");
      return [];
  }
}

export async function getJobPostingWithId(postingId) {
  try {
    const response = await axios.get(
      api.BACKEND_API + "/jobposting/id/" + postingId
    );

    if (response.status == 200) {
      return response.data;
    } else {
      return 0;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
}

export async function CreateJobPostingApi(companyEmail,loc,pos,sal,companyName,desc,remote,contract,duration,type,deadline) {
  try {
      const response = await axios
          .post(api.BACKEND_API + "/user/api/posting/"+companyEmail, {
              location: loc,
              position: pos,
              salary:sal,
              company: companyName,
              description: desc,
              remote:remote,
              contract: contract,
              duration: duration,
              type: type,
              postingDeadline: deadline
          })
      if( response.status==200 && response.data){
        console.log(response.data);
        return true
      }
      else{
        return false
      }
          
  } catch (err) {
      return false
  }
}


export async function removeJobPosting(companyEmail,jobPostingId) {
  try {
    
    const response = await axios
          .post(api.BACKEND_API + "/jobposting/remove/"+companyEmail, {
              docID: jobPostingId})
    if (response.status === 200) {
      // wait for the data to
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false; 
  }
}
