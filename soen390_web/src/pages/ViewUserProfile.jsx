import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Concordia from "../assets/UserProfileImages/Concordia.png";
import AmazonLogo from "../assets/UserProfileImages/amazon-logo-square.jpg";
import profilepicture from "../assets/default_picture.jpg";
import background from "../assets/profile_background.svg";
import AddDocumentsDialog from "../components/AddDocumentsDialog";
import AddEducationDialog from "../components/AddEducationDialog";
import AddExperienceDialog from "../components/AddExperienceDialog";
import AddSkillDialog from "../components/AddSkillDialog";
import "../styles/components/UserProfile.css";

import { useTranslation } from "react-i18next";
import { findUserById } from "../api/UserProfileApi";
import { GetFile } from "../api/UserStorageApi";
import ProfileFileItem from "../components/ProfileFileItem";

function ViewUserProfile(props) {
  const [enable, setEnable] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [resume, setResume] = React.useState();
  const [coverletter, setCoverletter] = React.useState();
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [resumeFilename, setResumeFilename] = React.useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickEnableEdit = () => {
    setEnable(true);
  };

  const handleDisableEdit = () => {
    setEnable(false);
  };
  const setFileData = useCallback(async () => {
    let UserCoverLetter = "";
    const getCoverLetter = async () => {
      UserCoverLetter = await GetFile(userData.userID, "coverletter");
      return UserCoverLetter;
    };

    if (UserCoverLetter && UserCoverLetter !== null) {
      const coverLetter = await getCoverLetter();
      setCoverletter(coverLetter);
      const url = coverLetter;
      setCoverletterFilename(
        decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
      );
    }

    let UserResume = "";
    const getResume = async () => {
      UserResume = await GetFile(userData.userID, "resume");
      return UserResume;
    };

    if (UserResume && UserResume !== null) {
      const resume = await getResume();
      setResume(resume);
      const url = resume;

      setResumeFilename(
        decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
      );
    }
  }, [userData.userID]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await findUserById(
        window.location.pathname.split("/").pop()
      );
      if (data != null) {
        console.log(data.data);
        setUserData(data.data);
      } else {
        navigate("/");
      }

      setFileData();
    };

    fetchData();
  }, [navigate, userData.userID, setFileData]);

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
                Software Engineering Student at Concordia University
              </Grid>
              <Grid item xs={6}>
                <div className="header">
                  {t("EducationText")}
                  <AddEducationDialog />
                  <IconButton onClick={handleClickEnableEdit}>
                    <EditIcon className="profile-icon" />
                  </IconButton>
                </div>
                <hr className="line"></hr>
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
                        src={Concordia}
                        alt="Amazon"
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
                      Concordia University
                      {enable && (
                        <IconButton>
                          <DeleteIcon className="profile-icon" />
                        </IconButton>
                      )}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      Bachelor of Engineering - BE, Software Engineering
                    </Typography>
                    <Typography
                      style={{ textAlign: "left", fontSize: "small" }}
                    >
                      2020 - 2024
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div className="header">
                  {t("ExperienceText")}
                  <AddExperienceDialog />
                  <IconButton onClick={handleClickEnableEdit}>
                    <EditIcon className="profile-icon" />
                  </IconButton>
                </div>
                <hr className="line"></hr>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="grid-container"
                  style={{ margin: "1em" }}
                >
                  <Grid item xs={2}>
                    <Grid style={{ height: "100%" }}>
                      <img
                        className="education-picture"
                        src={AmazonLogo}
                        alt="Concordia"
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
                      Software Development Engineer Intern
                      {enable && (
                        <IconButton>
                          <DeleteIcon className="profile-icon" />
                        </IconButton>
                      )}
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      Amazon
                    </Typography>
                    <Typography style={{ textAlign: "left" }}>
                      Vancouver, BC, Canada
                    </Typography>
                    <Typography
                      style={{ textAlign: "left", fontSize: "small" }}
                    >
                      May 2022 - August 2022
                    </Typography>
                  </Grid>
                </Grid>
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
                    <div className="header">{t("SkillsText")}</div>
                  </Grid>
                  <Grid item xs={6}>
                    <AddSkillDialog />
                    <IconButton onClick={handleClickEnableEdit}>
                      <EditIcon className="profile-icon" />
                    </IconButton>
                  </Grid>
                </Grid>
                <hr className="line"></hr>
                <Typography style={{ marginLeft: "5%" }} className="skill">
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
                <Typography style={{ marginLeft: "5%" }} className="skill">
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
                <Typography style={{ marginLeft: "5%" }} className="skill">
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
                <Typography style={{ marginLeft: "5%" }} className="skill">
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
                    <div className="header">{t("DocumentsText")}</div>
                  </Grid>
                  <Grid item xs={6}>
                    <AddDocumentsDialog setFileData={setFileData} />
                    <IconButton onClick={handleClickEnableEdit}>
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
                          filename={coverletterFilename}
                        />
                      </>
                    )}
                    {resume !== "" && (
                      <>
                        <Typography className="file-type">Resume</Typography>
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
                      backgroundColor: "rgba(100, 69, 227, 0.85)",
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

export default ViewUserProfile;
