import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";



export default function CompanyEditDescriptionModal() {

    const handleDescOnClick=()=>{

    }
    
  return (
    <React.Fragment>
      <Typography variant="h6" align="center" width="100%" gutterBottom>
        Edit Company description
      </Typography>

      <Grid item xs={12}>
        <TextField
          required
          id="description"
          name="description"
          label="Company Description"
          floatingLabelText="MultiLine and FloatingLabel"
            multiline
        rows={6}
          fullWidth
          autoComplete="Job-Title"
          variant="standard"
        />
      </Grid>
      <br></br>

      <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#9575cd", float: "right" }}
            onClick={handleDescOnClick}
          >
            Save Description
          </Button>
        </Grid>
      


    </React.Fragment>
  );
}