import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { useRef } from "react";
import FilterSelection from "../components/FilterSelection";
import SearchBar from "../components/SearchBar";
import SearchResultPagination from "../components/SearchResultPagination";

const UserNetworking = () => {
  const searchBarRef = useRef(null);

  const handleSearch = () => {
    const searchText = searchBarRef.current.getInputValue();
    console.log(searchText);
  };

  return (
    <div data-testid="login-1">
      <h1>User Networking</h1>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={12}>
            <SearchBar ref={searchBarRef} onSearchBtnClick={handleSearch} />
          </Grid>

          <Grid item xs={6} md={2} style={{ marginLeft: "1%" }}>
            <FilterSelection />
          </Grid>

          <Grid item xs={6} md={9} style={{ marginRight: "1%" }}>
            <SearchResultPagination />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserNetworking;
