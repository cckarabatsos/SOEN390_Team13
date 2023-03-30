import React from "react";
import '../styles/components/JobApplication.css'
import { Grid, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetFile } from "../api/UserStorageApi";
import AddDocumentsDialog from "../components/AddDocumentsDialog";
import { createApplication } from "../api/JobApplicationApi";


const JobApplicationComponent = (props) => {
    const [email, setEmail] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phone, setPhoneNumber] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [address2, setAddress2] = React.useState('')
    const [city, setCity] = React.useState('')
    const [province, setProvince] = React.useState('')
    const [area, setAreaCode] = React.useState('')
    
    const [school, setSchoolName] = React.useState('')
    const [schoolCountry, setSchoolCountry] = React.useState('')
    const [schoolDegree, setDegree] = React.useState('') 
    const [schoolEnd, setSchoolEnd] = React.useState('')   
    const [schoolMajor, setMajor] = React.useState('')
    const [attachResume, setAttachResume] = React.useState(false)
    const [attachCoverLetter, setAttachCoverLetter] = React.useState(false)
    const [experience, setExperience] = React.useState('')
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

    //For the import of the cover letter/CV
    /*
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
*/

    //for empty fields and non empty fields when filling out form
    
    const handleSubmit = async (e) => {        
            
        const success = await createApplication(props.userData.userID, email, firstName, lastName, phone,
            address, address2, city, area, province, school, schoolCountry, schoolDegree,
            schoolEnd, schoolMajor, attachResume, attachCoverLetter,
            experience);
        e.preventDefault(success);
        if (email.length ===0 || firstName.length === 0 || lastName.length === 0 || address.length === 0 || city.length === 0 || province.length === 0 || area.length === 0 || phone.length === 0 || school.length === 0
            || schoolDegree.length === 0 || schoolCountry.length === 0 || schoolMajor.length === 0 || Country.length === 0 || Company.length === 0 || JobTitle.length === 0 || Start.length === 0 || End.length === 0 || 
            attachResume.length === 0 || attachCoverLetter.length === 0 || experience.length === 0) {
            setError(true)
        }
        else{
            navigate("/JobSearch");
            alert("Form was submitted");
            console.log(email, firstName, lastName, address, city, province, area, phone,
                school, schoolDegree, schoolCountry, schoolMajor, Country, Company, JobTitle, Start, End)
        
        }       
    }
    
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="formoutline">
                <Grid container spacing={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <div className="header">{t("GeneralInformation*")}</div>                        
                            <div className="textboxname">{t("Email*")}</div>
                            {error && email.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setEmail(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("emailText")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />                            
                            <div className="textboxname">{t("FirstName*")}</div>
                            {error && firstName.length <= 0 ?
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
                            {error && lastName.length <= 0 ?
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
                            <div className="textboxname">{t("PhoneNumber*")}</div>
                            {error && phone.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setPhoneNumber(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("PhoneNumber*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Address*")}</div>
                            {error && address.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setAddress(e.target.value)}
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
                                        {error && city.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={e => setCity(e.target.value)}
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
                                        {error && province.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={e => setProvince(e.target.value)}
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
                                        {error && area.length <= 0 ?
                                            <label className="label">Cannot be empty!</label> : ""}
                                        <TextField
                                            onChange={e => setAreaCode(e.target.value)}
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
                            
                            <div className="header">{t("HigherEducation")}</div>
                            <div className="textboxname">{t("SchoolName*")}</div>
                            {error && school.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setSchoolName(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("SchoolName*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Country*")}</div>
                            {error && schoolCountry.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setSchoolCountry(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Country*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Degree*")}</div>
                            {error && schoolDegree.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e =>setDegree(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Degree*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("EndDateText")}</div>
                            {error && End.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setSchoolEnd(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("DegreeStatus*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            <div className="textboxname">{t("Major*")}</div>
                            {error && schoolMajor.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setMajor(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Major*")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />                            
                            <div className="header">{t("Work Experience")}</div>
                            <div className="textboxname">{t("Work Experience")}</div>
                            {error && experience.length <= 0 ?
                                <label className="label">Cannot be empty!</label> : ""}
                            <TextField
                                onChange={e => setExperience(e.target.value)}
                                autoFocus
                                className="input"
                                margin="dense"
                                label={t("Work Experience")}
                                type="name"
                                variant="outlined"
                                size="small"
                            />
                            
                            
                            <div className="buttons"> 
                                                       
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