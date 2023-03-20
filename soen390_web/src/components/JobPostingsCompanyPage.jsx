import React from "react";
import "../styles/components/JobPostingComponent.css";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AddressForm() {
    const [documents, setDocuments] = React.useState([]);

    const handleChange = (event) => {
        setDocuments(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Create Job Posting
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="JobTitle"
                        name="JobTitle"
                        label="Job Title"
                        fullWidth
                        autoComplete="Job-Title"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Company"
                        name="Company"
                        label="Company Name"
                        fullWidth
                        autoComplete="company-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="ApplicationDeadline"
                        name="ApplicationDeadline"
                        label="Application Deadlime"
                        fullWidth
                        autoComplete="App-deadline"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Required Documents:</Typography>
                    <Select
                        multiple
                        value={documents}
                        onChange={handleChange}
                        inputProps={{ name: 'documents', id: 'documents' }}
                    >
                        <MenuItem value="CV">CV</MenuItem>
                        <MenuItem value="Cover Letter">Cover Letter</MenuItem>
                        <MenuItem value="Unofficial Transcript">Unofficial Transcript</MenuItem>
                    </Select>
                    {documents.length > 0 && (
                        <Typography variant="subtitle1">
                            Selected Documents: {documents.join(', ')}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="ReqEduc"
                        name="ReqEduc"
                        label="Required Education"
                        fullWidth
                        autoComplete="req-educ"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="City"
                        name="City"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="JobDesc"
                        name="JobDesc"
                        label="Job Description"
                        fullWidth
                        autoComplete="Job-desc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="AppLoc"
                        name="AppLoc"
                        label="Apply on LinkedOut or externally"
                        fullWidth
                        autoComplete="App-Loc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#9575cd", float: "right" }}
                    >
                        Create Job Posting
                    </Button>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}
