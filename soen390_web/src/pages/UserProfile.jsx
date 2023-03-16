import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilepicture from "../assets/default_picture.jpg";
import background from "../assets/profile_background.svg";
import AmazonLogo from "../assets/UserProfileImages/amazon-logo-square.jpg";
import Concordia from "../assets/UserProfileImages/Concordia.png";
import AddDocumentsDialog from "../components/AddDocumentsDialog";
import AddEducationDialog from "../components/AddEducationDialog";
import AddExperienceDialog from "../components/AddExperienceDialog";
import AddSkillDialog from "../components/AddSkillDialog";
import "../styles/components/UserProfile.css";
//import ApplicationHistory from "./ApplicationHistory";
import ExperienceItem from "../components/ExperienceItem";
import ExperienceList from "../components/ExperienceList";

import { useTranslation } from "react-i18next";
import { GetFile } from "../api/UserStorageApi";
import { getExperience } from "../api/UserProfileApi";
import ProfileFileItem from "../components/ProfileFileItem";

function UserProfile(props) {
    const [enable, setEnable] = React.useState(false);
    const [userData, setUserData] = React.useState({});
    const [resume, setResume] = React.useState();
    const [coverletter, setCoverletter] = React.useState();
    const [picture, setpicture] = React.useState();
    const [coverletterFilename, setCoverletterFilename] = React.useState();
    const [resumeFilename, setResumeFilename] = React.useState();
    const [workExperience, setWorkExperience] = React.useState([]);
    const [educationExperience, setEducationExperience] = React.useState([]);
    const [isExperienceUpdated, setIsExperienceUpdated] = React.useState(false);
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleClickEnableEdit = () => {
        setEnable(true);
    };

    const handleDisableEdit = () => {
        setEnable(false);
    };

    const getUserExperience = async () => {
        const workData = await getExperience(userData.userID, "Work");
        setWorkExperience(workData);
        console.log("work: " + workData);

        const educationData = await getExperience(userData.userID, "Education");
        setEducationExperience(educationData);
        console.log("education: " + educationData);

        setIsExperienceUpdated(false);
    };

    const setFileData = () => {
        let UserCoverLetter = "";
        const getCoverLetter = async () => {
            UserCoverLetter = await GetFile(userData.userID, "coverletter");
            return UserCoverLetter;
        };

        if (UserCoverLetter && UserCoverLetter !== null) {
            getCoverLetter().then((coverLetter) => {
                setCoverletter(coverLetter);
                const url = coverLetter;
                setCoverletterFilename(
                    decodeURIComponent(
                        url.split("/").pop().split("?")[0]
                    ).split(" - ")[1]
                );
            });
            console.log(coverletterFilename);
        }

        let UserResume = "";
        const getResume = async () => {
            UserResume = await GetFile(userData.userID, "resume");
            return UserResume;
        };

        if (UserResume && UserResume !== null) {
            getResume().then((resume) => {
                setResume(resume);
                const url = resume;

                setResumeFilename(
                    decodeURIComponent(
                        url.split("/").pop().split("?")[0]
                    ).split(" - ")[1]
                );
                console.log(
                    decodeURIComponent(
                        url.split("/").pop().split("?")[0]
                    ).split(" - ")[1]
                );
                console.log("resume:", resume);
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
        getUserExperience();
        setFileData();
    }, [navigate, userData.userID]);

    useEffect(() => {
        if (isExperienceUpdated == true) getUserExperience();
    }, [isExperienceUpdated]);

    return (
        <>
            <div className="background-color">
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(${background})`,
                    }}
                >
                    <div className="foreground-colour">
                        <img
                            className="profile-pic"
                            alt="profile-pic"
                            src={profilepicture}
                        ></img>
                        <Grid container spacing={2}>
                            <Grid className="name" item xs={12}>
                                {userData.name}
                            </Grid>
                            <Grid className="bio" item xs={12}>
                                Software Engineering Student at Concordia
                                University
                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    {t("EducationText")}
                                    <AddEducationDialog
                                        userID={userData.userID}
                                        setIsExperienceUpdated={
                                            setIsExperienceUpdated
                                        }
                                    />
                                    <IconButton onClick={handleClickEnableEdit}>
                                        <EditIcon className="profile-icon" />
                                    </IconButton>
                                </div>
                                <hr className="line"></hr>
                                {educationExperience !== null && (
                                    <ExperienceList
                                        experiences={educationExperience}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    {t("ExperienceText")}
                                    <AddExperienceDialog
                                        userID={userData.userID}
                                        setIsExperienceUpdated={
                                            setIsExperienceUpdated
                                        }
                                    />
                                    <IconButton onClick={handleClickEnableEdit}>
                                        <EditIcon className="profile-icon" />
                                    </IconButton>
                                </div>
                                <hr className="line"></hr>
                                {workExperience !== null && (
                                    <ExperienceList
                                        experiences={workExperience}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    className="grid-container"
                                    style={{ marginLeft: "1em" }}
                                >
                                    <Grid item xs={6}>
                                        <div className="header">
                                            {t("SkillsText")}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AddSkillDialog />
                                        <IconButton
                                            onClick={handleClickEnableEdit}
                                        >
                                            <EditIcon className="profile-icon" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <hr className="line"></hr>
                                <Typography
                                    style={{ marginLeft: "5%" }}
                                    className="skill"
                                >
                                    Java
                                    {enable && (
                                        <span className="profile-item">
                                            <IconButton>
                                                <DeleteIcon className="profile-icon" />
                                            </IconButton>
                                        </span>
                                    )}
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography
                                    style={{ marginLeft: "5%" }}
                                    className="skill"
                                >
                                    Python
                                    {enable && (
                                        <span className="profile-item">
                                            <IconButton>
                                                <DeleteIcon className="profile-icon" />
                                            </IconButton>
                                        </span>
                                    )}
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography
                                    style={{ marginLeft: "5%" }}
                                    className="skill"
                                >
                                    JavaScript
                                    {enable && (
                                        <span className="profile-item">
                                            <IconButton>
                                                <DeleteIcon className="profile-icon" />
                                            </IconButton>
                                        </span>
                                    )}
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography
                                    style={{ marginLeft: "5%" }}
                                    className="skill"
                                >
                                    Software Testing
                                    {enable && (
                                        <span className="profile-item">
                                            <IconButton>
                                                <DeleteIcon className="profile-icon" />
                                            </IconButton>
                                        </span>
                                    )}
                                </Typography>
                                <hr className="sub-line"></hr>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    className="grid-container"
                                    style={{ marginLeft: "1em" }}
                                >
                                    <Grid item xs={6}>
                                        <div className="header">
                                            {t("DocumentsText")}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AddDocumentsDialog
                                            setFileData={setFileData}
                                        />
                                        <IconButton
                                            onClick={handleClickEnableEdit}
                                        >
                                            <EditIcon className="profile-icon" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <hr className="line"></hr>
                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    className="grid-container"
                                    style={{ marginLeft: "1em" }}
                                >
                                    <Grid item xs={12}>
                                        {coverletter !== "" && (
                                            <>
                                                <Typography className="file-type">
                                                    Cover Letter
                                                </Typography>
                                                <ProfileFileItem
                                                    file={coverletter}
                                                    filename={
                                                        coverletterFilename
                                                    }
                                                />
                                            </>
                                        )}
                                        {resume !== "" && (
                                            <>
                                                <Typography className="file-type">
                                                    Resume
                                                </Typography>
                                                <ProfileFileItem
                                                    file={resume}
                                                    filename={resumeFilename}
                                                />
                                            </>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                {enable && (
                                    <Button
                                        className="button"
                                        variant="contained"
                                        style={{
                                            borderRadius: 27,
                                            backgroundColor:
                                                "rgba(100, 69, 227, 0.85)",
                                        }}
                                        onClick={handleDisableEdit}
                                    >
                                        Save Changes
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default UserProfile;
