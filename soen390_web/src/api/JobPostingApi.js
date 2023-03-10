import axios from "axios";
import api from "../config.json";

export async function JobSearch(category, text) {

  //switch statement to check which category has been selected,
  //make request to backend API to search for jobs based on location,
  // company, position, type, remote
  // includes a default case
  switch(category){
    
    case 'location': 
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
        return false;
      } 
      case 'company':
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
          return false;
        } 
        case 'position':
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
            return false;
          } 
          case 'type':
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
              return false;
            } 
            case 'remote':
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
                return false;
              } 
        
              default:
                console.error("Invalid category specified");
                return false;
          } 
        }