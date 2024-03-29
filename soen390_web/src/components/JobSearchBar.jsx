import React, { useState } from "react";
import "../styles/components/JobSearchBar.css";
import { Button } from "@material-ui/core";
import { JobSearch } from "../api/JobPostingApi";
import { useTranslation } from "react-i18next";

function JobSearchBar({ setJobs }) {
 
  // initialize state vars, handle text input change
  const [category, setCategory] = useState("location");
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //handle category selection change
  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  //handle job search
  const handleSearch = async () => {
    var jobs = await JobSearch(category, text);
    if (jobs && jobs.length != 0) {
      setJobs(jobs);
    }
      else {
        alert("No matching jobs with the selected criteria were found. Please modify your search.");
        console.log("no match");
        setJobs([]);
      }
  };

  // render job search bar, search button, dropdown filter to select category
  return (
    <div className="input-box" style={{borderColor:"#9C27B0"}}>
      <i className="uil uil-search"></i>
      <div>
        <input
          type="text"
          placeholder={t("SearchText")}
          value={text}
          onChange={handleTextChange}
          data-testid="search-input"
        />
        <Button
          className="button"
          variant="contained"
          onClick={handleSearch}
          style={{
            borderRadius: 27,
            display: "inline-block", width: "125px", 
            border: "2px solid #9C27B0",
            backgroundColor: "white",
            textTransform: "none",
            fontSize: "15px",
            height: "43px",
          }}
        >
          {t("SearchText")}
        </Button>
        
        <select
          name="category"
          id="category"
          className="buttonfilter"
          style={{
            borderRadius: 27,
            display: "inline-block", 
            width: "125px", 
            height: "43px",
            marginRight: "140px",
            border: "2px solid #9C27B0",
            fontSize: "15px",
          }}
          value={category}
          onChange={handleChange}
        >
          
          <option value="location">{t("LocationText")}</option>
          <option value="company">{t("CompanyText")}</option>
          <option value="position">{t("PositionText")}</option>
          <option value="type">{t("TypeText")}</option> 
          {/* <option value="remote">{t("RemoteText")}</option> */}
        </select>
      </div>
    </div>
  );
}
export default JobSearchBar;
