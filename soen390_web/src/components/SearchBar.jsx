import React from "react";
import "../styles/components/SearchBar.css";
import { useNavigate } from "react-router-dom";
import {Grid, Button} from "@material-ui/core";

function SearchBar(){

  const navigate = useNavigate();

return(

    <div class="input-box">
      <i class="uil uil-search"></i>
      <div>
      
      <input type="text" placeholder="Search for jobs here..." />
                  <Button
                    className="button"
                    variant="contained"
                    
                    /* need database to be completed for search to be able to 
                    search a list of items... wait for that*/
                    /* link to where clicking search goes */
                    onClick={() => navigate("")}
                    style={{
                      borderRadius: 27,
                      backgroundColor: "#a640f4b9",
                    }}
                  >
                    Search
                  </Button>
                  
                </div>
    </div>

);
}
export default SearchBar;
