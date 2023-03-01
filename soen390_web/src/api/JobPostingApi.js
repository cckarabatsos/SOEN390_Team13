import axios from "axios";
import api from "../config.json";

export async function JobSearch(category, text) {

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
      case 'company': console.log('boooooooo')
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
        case 'position': console.log('biiiiiiii')
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
          case 'type': console.log('oyaaaaa')
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
            case 'remote': console.log('aibadbhdkasdkj')
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
  } 
}
