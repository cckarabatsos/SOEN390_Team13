import React from "react";
import "../styles/components/JobPostingComponent.css";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";

export default function JobPosingViewModal({
  viewDesc,
  viewPosition,
  viewLocation,
  viewSalary,
  // viewContract,
  viewEmail,
  viewCompany,
  viewMandatoryResume,
  viewMandatoryCoverLetter,
  viewPostingDeadline,
}) {
  const [documents, setDocuments] = React.useState([]);
  const { t } = useTranslation();
  const handleChange = (event) => {
    setDocuments(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        <b>Position: </b>
        {" " + viewPosition}
      </Typography>
      <Divider variant="middle" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            <b>Company: </b>
            {" " + viewCompany}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            <b>Location: </b> {" " + viewLocation}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider variant="middle" />
          <Typography variant="h6">
            <b>Job Description: </b>
          </Typography>
          <Stack spacing={2}>
            <Typography variant="h7">{viewDesc}</Typography>
            <Typography variant="h7">
              <b>Salary:</b> {" " + viewSalary}
            </Typography>
            <Typography variant="h7">
              <b>Contact:</b> {" " + viewEmail}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
          <Typography variant="h6">
            <b>Required Documents: </b>
          </Typography>
          <Stack spacing={2}>
            <Typography variant="h7">
              <b>Resume:</b>{" "}
              {" " + viewMandatoryResume ? "Required" : "not Required"}
            </Typography>
            <Typography variant="h7">
              <b>Cover Lettert:</b>{" "}
              {" " + viewMandatoryCoverLetter ? "Required" : "not Required"}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
          <Typography variant="h6">
            <b>Deadlines </b>
          </Typography>
          <Typography variant="h7" color="error">
            <b>Applications Deadline</b> {" " + viewPostingDeadline}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#9575cd", float: "right" }}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
