import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import React from "react";
import FilterSelection from "../components/FilterSelection";
import SearchBar from "../components/SearchBar";
import SearchResultCard from "../components/SearchResultCard";
const UserNetworking = () => {
  return (
    <div data-testid="login-1">
      <h1>User Networking</h1>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={12}>
            <SearchBar />
          </Grid>

          <Grid item xs={6} md={2} style={{ marginLeft: "1%" }}>
            <FilterSelection />
          </Grid>

          <Grid item xs={6} md={9} style={{ marginRight: "1%" }}>
            <SearchResultCard />
            <SearchResultCard />
            <SearchResultCard />
            <SearchResultCard />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserNetworking;
