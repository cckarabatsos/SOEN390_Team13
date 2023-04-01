import React from "react";
import "../styles/components/JobPostingComponent.css";

import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Stack,Button } from "@mui/material";


export default function CompanyApplicationViewModal({
    viewApplication
  }) {
    console.log(viewApplication.experiences)
    return (
        <React.Fragment>
          <Typography variant="h5" gutterBottom  align="center" width="100%">
            <b>Application Review</b>
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            <b>Appliant Contact Information</b>
          </Typography>
          <Divider variant="middle" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h7">
                <b>Name: </b>
                {" " + viewApplication.lastName + ", " + viewApplication.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="7">
                <b>Email: </b> {" " + viewApplication.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7">
                <b>Main Address: </b> {" " + viewApplication.address+ "," + viewApplication.area + ", " +viewApplication.province + ", " + viewApplication.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography variant="h6">
                <b>Education: </b>
              </Typography>
              <Stack spacing={2}>
                <Typography variant="h7">
                  <b>School Name:</b> {" " + viewApplication.school}
                </Typography>
                <Typography variant="h7">
                  <b>Major:</b> {" " + viewApplication.schoolMajor}
                </Typography>
                <Typography variant="h7">
                  <b>School Country:</b> {" " + viewApplication.schoolCountry}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography variant="h6">
                <b>Experiences </b>
              </Typography>
              {viewApplication.experiences&& viewApplication.experiences.length !=0&&
                 <Stack spacing={2}>
                 {viewApplication.experiences.map((exp)=>(
                      <Typography variant="h7" >
                      <b>Experience:</b> {" " + exp}
                    </Typography>
                 ))}
               </Stack>
              }
              {!viewApplication.experiences|| viewApplication.experiences.length ==0&&
              <Typography variant="h7" color="error">
              No previous experiences
            </Typography>}
             
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                >
                Accept
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="error"
                style={{  float: "right" }}>
                Reject
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>)

  }