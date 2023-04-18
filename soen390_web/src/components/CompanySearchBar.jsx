import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CompanyApi } from "../api/CompanyApi";
import "../styles/components/CompanySearchBar.css";

export function CompanySearchBar({ setCompanies }) {
  // initialize state vars, handle text input change
  const [category, setCategory] = useState("name");
  const [text, setText] = useState("");
  const { t } = useTranslation();
  // const navigate = useNavigate();
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
    console.log("text: " + text + " category: " + category);
    var companies = await CompanyApi(category, text, 0, 0);

    if (companies && companies.length != 0) {
      setCompanies(companies);
    }
      else {
        alert("No matching companies with the selected criteria were found. Please modify your search.");
        console.log("no match");
        setCompanies([]);
      }
  };

  // render job search bar, search button, dropdown filter to select category
  return (
    <div className="input-box-company">
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
            display: "inline-block",
            width: "125px",
            border: "2px solid #006AF9",
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
            border: "2px solid #006AF9",
            fontSize: "15px",
          }}
          value={category}
          onChange={handleChange}
        >
          <option value="name">{t("NameText")}</option>
          <option value="email">{t("ByEmailText")}</option>
          {/* <option value="remote">{t("RemoteText")}</option> */}
        </select>
      </div>
    </div>
  );
}
