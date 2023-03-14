import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { searchInfo } from "../api/userNetworkingApi";
import FilterSelection from "../components/FilterSelection";
import SearchBar from "../components/SearchBar";
import SearchResultPagination from "../components/SearchResultPagination";
import "../styles/components/UserNetworking.css";

const UserNetworking = () => {
  const searchBarRef = useRef(null);
  const [radioValue, setRadioValue] = useState("name");
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();
  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleSearch = async () => {
    const searchText = searchBarRef.current.getInputValue();
    const temp = await searchInfo(radioValue, searchText);
    setSearchResults(temp.data[1]);
  };

  return (
    <div className="usernetworking" data-testid="login-1">
      <h1>{t("UserNetworkingText")}</h1>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={12}>
            <SearchBar ref={searchBarRef} onSearchBtnClick={handleSearch} />
          </Grid>

          <Grid item xs={6} md={2} style={{ marginLeft: "1%" }}>
            <FilterSelection
              onRadioChange={handleRadioChange} // Pass handleRadioChange as prop
              radioValue={radioValue} // Pass radioValue as prop
            />
          </Grid>

          <Grid item xs={6} md={9} style={{ marginRight: "1%" }}>
            <SearchResultPagination searchResults={searchResults} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserNetworking;
