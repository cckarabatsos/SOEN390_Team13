import React, { useState } from "react";
import "../styles/components/SearchBar.css";
import { useNavigate } from "react-router-dom";
import {Button} from "@material-ui/core";

function SearchBar(){

  const navigate = useNavigate();

  const [category, setCategory] = useState("location");
  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value)
  };

  const handleSearch = () => {
    console.log("Blahhhhh ")
  }

return(

    <div class="input-box">
      <i class="uil uil-search"></i>
      <div>
      
      <input type="text" placeholder="Search here..." />
                  <Button
                    className="button"
                    variant="contained"
                  
                    onClick={handleSearch}
                    style={{
                      borderRadius: 27,
                      backgroundColor: "#a640f4b9",
                    }}
                  >
                    Search
                  </Button>
                    
                  <select category="category" id="category" className="buttonfilter"
                  style={{
                    borderRadius: 27,
                    backgroundColor: "#a640f4b9",
                  }}
                  value={category}
                  onChange={handleChange}
                  >
                    
                    <option value="Location">Location</option>
                    <option value="Company">Company</option>
                    <option value="Position">Position</option>
                    <option value="Contract">Contract</option>

                  </select>
                </div>
    </div>

);
}
export default SearchBar;
