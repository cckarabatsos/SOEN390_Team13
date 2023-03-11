import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import AmazonLogo from "../assets/UserProfileImages/amazon-logo-square.jpg";

const ExperienceItem = ({ experience }) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ margin: "1em" }}
      >
        <Grid item xs={2}>
          <Grid style={{ height: "100%" }}>
            <img
              className="education-picture"
              src={experience.logo}
              alt="logo"
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Typography
            style={{
              textAlign: "left",
              fontWeight: "Bold",
              fontSize: "large",
            }}
          >
            {experience.position}
            {/* {enable && (
              <IconButton>
                <DeleteIcon className="profile-icon" />
              </IconButton>
            )} */}
          </Typography>
          <Typography style={{ textAlign: "left" }}>
            {experience.company}
          </Typography>
          <Typography style={{ textAlign: "left", fontSize: "small" }}>
            {experience.startDate} - {experience.endDate || "Today"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ExperienceItem;
