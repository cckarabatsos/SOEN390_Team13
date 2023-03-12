import React from "react";
import '../styles/components/JobApplication.css'
import { Grid, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetFile } from "../api/UserStorageApi";
import AddDocumentsDialog from "../components/AddDocumentsDialog";

const JobApplicationComponent = () => {

    const [FirstName, setFirstName] = React.useState('')
    const [LastName, setLastName] = React.useState('')
    const [Address, setAddress] = React.useState('')
    const [City, setCity] = React.useState('')
    const [Province, setProvince] = React.useState('')
    const [AreaCode, setAreaCode] = React.useState('')
    const [PhoneNumber, setPhoneNumber] = React.useState('')
    const [SchoolName, setSchoolName] = React.useState('')
    const [Degree, setDegree] = React.useState('')
    const [DegreeStatus, setDegreeStatus] = React.useState('')
    const [Major, setMajor] = React.useState('')
    const [Country, setCountry] = React.useState('')
    const [Company, setCompany] = React.useState('')
    const [JobTitle, setJobTitle] = React.useState('')
    const [Start, setStart] = React.useState('')


    const [End, setEnd] = React.useState('')
    const [error, setError] = React.useState(false)
    const { t } = useTranslation();
    const [userData, setUserData] = React.useState({});
    const [Resume, setResume] = React.useState();
    const [Coverletter, setCoverletter] = React.useState();
    const [coverletterFilename, setCoverletterFilename] = React.useState();
    const [ResumeFilename, setResumeFilename] = React.useState();
    const navigate = useNavigate();


    const setFileData = () => {
        let UserCoverLetter = "";
        const getCoverLetter = async () => {
            UserCoverLetter = await GetFile(userData.userID, "coverletter");
            return UserCoverLetter;
        };

        if (UserCoverLetter !== null) {
            getCoverLetter().then((coverLetter) => {
                setCoverletter(coverLetter);                
                const url = coverLetter;
                setCoverletterFilename(
                    decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
                );
                
            });
            console.log(coverletterFilename);
        
        }

        let UserResume = "";
        const getResume = async () => {
            UserResume = await GetFile(userData.userID, "resume");
            return UserResume;
        };

        if (UserResume !== null) {
            getResume().then((resume) => {
                setResume(resume);
                if(resume){
                const url = resume;
                setResumeFilename(
                    decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
                );
                console.log(
                    decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
                );
                console.log("resume:", resume);
                }
            });
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("isAuth"));
        if (data != null) {
            setUserData(JSON.parse(localStorage.getItem("isAuth")));
        } else {
            navigate("/");
        }

        setFileData();
    }, [navigate, userData.userID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (FirstName.length === 0 || LastName.length === 0 || Address.length === 0 || City.length === 0 || Province.length === 0 || AreaCode.length === 0 || PhoneNumber.length === 0 || SchoolName.length === 0
            || Degree.length === 0 || DegreeStatus.length === 0 || Major.length === 0 || Country.length === 0 || Company.length === 0 || JobTitle.length === 0 || Start.length === 0 || End.length === 0) {
            setError(true)
        }
        else{
            navigate("/JobSearch");
            alert("Form was submitted");
            console.log(FirstName, LastName, Address, City, Province, AreaCode, PhoneNumber,
                SchoolName, Degree, DegreeStatus, Major, Country, Company, JobTitle, Start, End)
        }
        
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="formoutline">
                <Grid container spacing={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <div className="header">{t("GeneralInformation*")}</div>
                            <div className="textboxname">{t("FirstName*")}</div>
                            {error && FirstName.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setFirstName(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("FirstName*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("LastName*")}</div>
                            {error && LastName.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setLastName(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("LastName*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Address*")}</div>
                            {error && Address.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setAddress}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Address*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Address2")}</div>
                            <TextField
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Address2")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <div className="city">
                                        <div className="textboxname">{t("City*")}</div>
                                        {error && City.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={setCity}
                                            autoFocus
                                            className="input2"
                                            margin="dense"
                                            label={t("City*")}
                                            type="name"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="province">
                                        <div className="textboxname">{t("Province*")}</div>
                                        {error && Province.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={setProvince}
                                            autoFocus
                                            className="input2"
                                            margin="dense"
                                            label={t("Province*")}
                                            type="name"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="areacode">
                                        <div className="textboxname">{t("AreaCode*")}</div>
                                        {error && AreaCode.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={setAreaCode}
                                            autoFocus
                                            className="input2"
                                            margin="dense"
                                            label={t("AreaCode*")}
                                            type="name"
                                            variant="outlined"
                                            size="small"

                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="textboxname">{t("PhoneNumber*")}</div>
                            {error && PhoneNumber.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setPhoneNumber}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("PhoneNumber*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="header">{t("HigherEducation")}</div>
                            <div className="textboxname">{t("SchoolName*")}</div>
                            {error && SchoolName.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setSchoolName}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("SchoolName*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Degree*")}</div>
                            {error && Degree.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setDegree}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Degree*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("DegreeStatus*")}</div>
                            {error && DegreeStatus.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setDegreeStatus}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("DegreeStatus*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Major*")}</div>
                            {error && Major.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setMajor}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Major*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Country*")}</div>
                            {error && Country.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setCountry}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Country*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="header">{t("Work Experience")}</div>
                            <div className="textboxname">{t("Company*")}</div>
                            {error && Company.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setCompany}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Company*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("JobTitle*")}</div>
                            {error && JobTitle.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={setJobTitle}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("JobTitle*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <div className="start">
                                        <div className="textboxname">{t("Start*")}</div>
                                        {error && Start.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={setStart}
                                            autoFocus
                                            className="input2"
                                            margin="dense"
                                            label={t("Start*")}
                                            type="name"
                                            variant="outlined"
                                            size="small"

                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div className="end">
                                        <div className="textboxname">{t("End*")}</div>
                                        {error && End.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={setEnd}
                                            autoFocus
                                            className="input2"
                                            margin="dense"
                                            label={t("End*")}
                                            type="name"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="buttons"> 
                            <AddDocumentsDialog setFileData={setFileData} />                           
                            <Button
                                className="button"
                                variant="contained"
                                style={{
                                    borderRadius: 27,
                                    backgroundColor: "#6C63FF",
                                    width: 135,
                                    padding: 10,
                                    
                                }}
                            >
                                {t("importcv")}
                            </Button>                            
                            <Button
                                onClick={handleSubmit}
                                className="button"
                                variant="contained"
                                style={{
                                    borderRadius: 27,
                                    backgroundColor: "#6C63FF",
                                    width: 135,
                                    padding: 10,
                                }}
                            >
                                {t("Apply")}
                            </Button> 
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </form>

    )
}

export default JobApplicationComponent