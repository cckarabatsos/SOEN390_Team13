import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { searchUsers } from "../api/userNetworkingApi";
import "../styles/components/CompanySearchBar.css";

function UserSearchBar({ setUsers }) {
  // initialize state vars, handle text input change
  const [category, setCategory] = useState("name");
  const [text, setText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //handle category selection change
  const handleChange = (e) => {
    setCategory(e.target.value);
    //console.log(e.target.value);
  };

  //handle job search
  const handleSearch = async () => {
    //console.log("text: " + text + " category: " + category);
    const temp = await searchUsers(category, text);
    //console.log(temp);
    //var companies = await CompanyApi(category, text, 0, 0);
    if (temp && temp.length != 0) {
    setUsers(temp);
  }
    else {
      alert("No matching users with the selected criteria were found. Please modify your search.");
      console.log("no match");
      setUsers([]);
    }
  }
  // render job search bar, search button, dropdown filter to select category
  return (
    <div className="input-box" style={{borderColor:"#5319FB"}}>
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
            border: "2px solid #5319FB",
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
            border: "2px solid #5319FB",
            fontSize: "15px",
          }}
          value={category}
          onChange={handleChange}
        >
          <option value="name">{t("NameText")}</option>
          <option value="email">{t("ByEmailText")}</option>
        </select>
      </div>
    </div>
  );
}
export default UserSearchBar;
