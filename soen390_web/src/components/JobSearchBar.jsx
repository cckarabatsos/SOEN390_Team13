import React, { useState } from "react";
import "../styles/components/JobSearchBar.css";
import { Button } from "@material-ui/core";
import { JobSearch } from "../api/JobPostingApi";
import { useTranslation } from "react-i18next";

function JobSearchBar({ setJobs }) {
 
  const [category, setCategory] = useState("location");
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = async () => {
    console.log("text: " + text + " category: " + category);
  
    var jobs = await JobSearch(category, text);
  
    console.log(jobs);
    setJobs(jobs)
  };

  return (
    <div className="input-box">
      <i className="uil uil-search"></i>
      <div>
        <input
          type="text"
          placeholder={t("SearchText")}
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
          
          <option value="location">{t("LocationText")}</option>
          <option value="company">{t("CompanyText")}</option>
          <option value="position">{t("PositionText")}</option>
          <option value="type">{t("TypeText")}</option>
          <option valye="remote">{t("RemoteText")}</option>
        </select>
      </div>
    </div>
  );
}
export default JobSearchBar;
