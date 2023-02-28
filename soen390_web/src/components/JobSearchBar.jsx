import React, { useState } from "react";
import "../styles/components/JobSearchBar.css";
import { Button } from "@material-ui/core";
import { JobSearch } from "../api/JobPostingApi";

function JobSearchBar({ setJobs }) {
 
  const [category, setCategory] = useState("location");
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = async () => {
    console.log("text: " + text + " category " + category);

    var jobs = await JobSearch(text);

    console.log(jobs);
    setJobs(jobs)
  };

  return (
    <div className="input-box">
      <i className="uil uil-search"></i>
      <div>
        <input
          type="text"
          placeholder="Search here..."
          value={text}
          onChange={handleTextChange}
        />
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
        
        <select
          category="category"
          id="category"
          className="buttonfilter"
          style={{
            borderRadius: 27,
            backgroundColor: "#a640f4b9",
          }}
          value={category}
          onChange={handleChange}
        >
          <option value="">Filter By:</option>
          <option value="Location">Location</option>
          <option value="Company">Company</option>
          <option value="Position">Position</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
    </div>
  );
}
export default JobSearchBar;
