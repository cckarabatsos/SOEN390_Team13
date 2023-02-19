import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { searchInfo } from "../api/userNetworkingApi";
import FilterSelection from "../components/FilterSelection";

import SearchResultPagination from "../components/SearchResultPagination";

const UserNetworking = () => {
  const searchBarRef = useRef(null);
  const [radioValue, setRadioValue] = useState("name");
  const [searchResults, setSearchResults] = useState([]);

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  const handleSearch = async () => {
    const searchText = searchBarRef.current.getInputValue();
    console.log(searchText);
    console.log(radioValue);
    const temp = await searchInfo(searchText, radioValue);
    console.log(temp);
    const TEMP_SEARCH_RESULTS = [
      {
        name: "John Doe",
        position: "Software Engineer",
        address: "123 Main St",
        connections: 10,
      },
      {
        name: "Jane Smith",
        position: "Product Manager",
        address: "456 Market St",
        connections: 20,
      },
      {
        name: "Bob Johnson",
        position: "Sales Associate",
        address: "789 Broadway",
        connections: 5,
      },
      {
        name: "Mary Williams",
        position: "UX Designer",
        address: "246 Elm St",
        connections: 15,
      },
      {
        name: "Alex Lee",
        position: "Data Analyst",
        address: "135 Oak St",
        connections: 25,
      },
      {
        name: "Samantha Brown",
        position: "Marketing Manager",
        address: "789 Main St",
        connections: 8,
      },
    ];
    setSearchResults(TEMP_SEARCH_RESULTS);
  };

  return (
    <div data-testid="login-1">
      <h1>User Networking</h1>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={12}>
           
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
