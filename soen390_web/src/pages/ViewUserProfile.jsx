import { Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { findUserById, getExperience, getSkills } from "../api/UserProfileApi";
import { GetFile } from "../api/UserStorageApi";
import background from "../assets/profile_background.svg";
import ProfileFileItem from "../components/ProfileFileItem";
import "../styles/components/UserProfile.css";

function ViewUserProfile(props) {
  const [enable, setEnable] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [userExperiences, setUserExperiences] = React.useState([]);
  const [userEducation, setUserEducation] = React.useState([]);
  const [userSkills, setUserSkills] = React.useState([]);
  const [resume, setResume] = React.useState();
  const [coverletter, setCoverletter] = React.useState();
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [resumeFilename, setResumeFilename] = React.useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

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
      const userID = window.location.pathname.split("/").pop();
      const data = await findUserById(userID);
      if (data != null) {
        const experiences = await getExperience(userID, "Work");
        const education = await getExperience(userID, "Education");
        const skillList = await getSkills(userID);

        setUserData(data.data);
        setUserSkills(skillList);
        setUserEducation(education);
        setUserExperiences(experiences);
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
              src={userData.picture}
            ></img>
            <Grid container spacing={2}>
              <Grid className="name" item xs={12}>
                {userData.name}
              </Grid>
              <Grid className="bio" item xs={12}>
                {userData.bio}
              </Grid>
              <Grid item xs={6}>
                <div className="header">{t("EducationText")}</div>
                <hr className="line"></hr>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ margin: "1em" }}
                >
                  {userEducation
                    .sort((a, b) => {
                      if (a.atPresent) return -1;
                      if (b.atPresent) return 1;
                      return new Date(b.endDate) - new Date(a.endDate);
                    })
                    .map((education) => (
                      <React.Fragment key={education.experienceID}>
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
                                src={education.logo}
                                alt={education.company}
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
                              {education.company}
                              {enable && (
                                <IconButton>
                                  <DeleteIcon className="profile-icon" />
                                </IconButton>
                              )}
                            </Typography>
                            <Typography style={{ textAlign: "left" }}>
                              {education.position}
                            </Typography>
                            <Typography
                              style={{ textAlign: "left", fontSize: "small" }}
                            >
                              {education.startDate} -{" "}
                              {education.atPresent
                                ? "Present"
                                : education.endDate}
                            </Typography>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div className="header">{t("ExperienceText")}</div>
                <hr className="line"></hr>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ margin: "1em" }}
                >
                  {userExperiences
                    .sort((a, b) => {
                      if (a.atPresent) return -1;
                      if (b.atPresent) return 1;
                      return new Date(b.endDate) - new Date(a.endDate);
                    })
                    .map((experience) => (
                      <React.Fragment key={experience.experienceID}>
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
                                alt={experience.company}
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
                              {experience.company}
                              {enable && (
                                <IconButton>
                                  <DeleteIcon className="profile-icon" />
                                </IconButton>
                              )}
                            </Typography>
                            <Typography style={{ textAlign: "left" }}>
                              {experience.position}
                            </Typography>
                            <Typography
                              style={{ textAlign: "left", fontSize: "small" }}
                            >
                              {experience.startDate} -{" "}
                              {experience.atPresent
                                ? "Present"
                                : experience.endDate}
                            </Typography>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    ))}
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
                </Grid>
                <hr className="line"></hr>
                {userSkills &&
                  userSkills.map((skill) => (
                    <React.Fragment key={skill.skillID}>
                      <Typography
                        style={{ marginLeft: "5%" }}
                        className="skill"
                      >
                        {skill.name}
                      </Typography>
                      <hr className="sub-line" />
                    </React.Fragment>
                  ))}
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
                    {userData.coverLetter !== "" && (
                      <>
                        <Typography className="file-type">
                          Cover Letter
                        </Typography>
                        <ProfileFileItem
                          file={userData.coverLetter}
                          filename={coverletterFilename}
                        />
                      </>
                    )}
                    {userData.resume !== "" && (
                      <>
                        <Typography className="file-type">Resume</Typography>
                        <a
                          href={userData.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ProfileFileItem file={userData.resume} />
                        </a>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUserProfile;
