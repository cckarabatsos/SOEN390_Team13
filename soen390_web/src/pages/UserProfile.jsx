import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useInsertionEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profilepicture from "../assets/default_picture.jpg";
import background from "../assets/profile_background.svg";
import AddEducationDialog from "../components/AddEducationDialog";
import AddExperienceDialog from "../components/AddExperienceDialog";
import AddSkillDialog from "../components/AddSkillDialog";
import ExperienceList from "../components/ExperienceList";
import "../styles/components/UserProfile.css";
import ApplicationHistory from "./ApplicationHistory";
import AddDocumentsDialog from "../components/AddDocumentsDialog";
import { useLocation } from "react-router-dom";
import { findUserById } from "../api/UserProfileApi";

import { useTranslation } from "react-i18next";
import {
  addSkill,
  getExperience,
  getSkills,
  removeSkill,
  uploadPicture,
  updateUserProfilePicture
} from "../api/UserProfileApi";
import { GetFile } from "../api/UserStorageApi";
import ProfileFileItem from "../components/ProfileFileItem";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function UserProfile(props) {
  // const { state } = useLocation();
  // const { picture } = state;
  const [enable, setEnable] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [resume, setResume] = React.useState();
  const [coverletter, setCoverletter] = React.useState();
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [resumeFilename, setResumeFilename] = React.useState();
  const [workExperience, setWorkExperience] = React.useState([]);
  const [educationExperience, setEducationExperience] = React.useState([]);
  const [isExperienceUpdated, setIsExperienceUpdated] = React.useState(false);
  const [updateState, setUpdateState] = React.useState(false);
  const [updateImage, setUpdateImage]=React.useState(false);
  const [updateFile, setUpdateFile] = React.useState(false);

  const inputFile = useRef(null);
  

  const [skills, setSkills] = React.useState([]);

  const [newSkill, setNewSkill] = React.useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickEnableEdit = () => {
    setEnable(true);
  };

  const handleDisableEdit = () => {
    setEnable(false);
  };

  const [image, setImage] = React.useState(null);

  const handleImageChange = async (e) => {

    setUpdateImage(true)

    console.log("in handle picture change")
    if (e.target.files && e.target.files[0]) {
      const reader = await new FileReader();
     
       reader.onload = (event) => {

        setImage(event.target.result);
        
      };
      
      
      console.log(e.target.files[0])
      console.log(image)
      
      await reader.readAsDataURL(e.target.files[0]);
      // console.log('in handleImageChange');
      // await handleDescOnClick(picUrl);
    }
   
   
  };

  const handleDescOnClick = async (url) => {
    console.log('in handleDescOnClick');
    console.log(url)
    let res = await updateUserProfilePicture(userData,url,userData.name);

    console.log(res)

    if (res) {
      setUpdateState(!updateState);
    } else {
      console.log("error in description");
    }
  };


  useEffect(()=>{

    console.log("hello")
    handleDescOnClick(image)
   
   
  },[image])

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

    // getting cover letter
    if (UserCoverLetter !== null) {
      getCoverLetter().then((coverLetter) => {
        setCoverletter(coverLetter);
        const url = coverLetter;
        setCoverletterFilename(
          decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
        );
      });
    }

    // getting resume
    let UserResume = "";
    const getResume = async () => {
      UserResume = await GetFile(userData.userID, "resume");
      return UserResume;
    };

    if (UserResume !== null) {
      getResume().then((resume) => {
        setResume(resume);
        const url = resume;
        setResumeFilename(
          decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
        );
      });
    }
  };

  const getSkillList = async (userID) => {
    var response = await getSkills(userID);
    var skillArray = [];

    for (var i = 0; i < response.length; i++) {
      skillArray.push([response[i]["name"], response[i]["skillID"]]);
    }

    setSkills(skillArray);
  };

  const onProfileClick = () => {
    inputFile.current.click();
  };

  const getProfile = async (userID) => {

    let user= await findUserById(userID)
    setImage(user.data.picture)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUserData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      setUserData(false);
    }
    getUserExperience();
    setFileData();
    getSkillList(userData.userID);

    if(!updateImage){
      getProfile(userData.userID)
    }
    
    
  }, [userData.userID,updateState]);

  useEffect(() => {
    if (isExperienceUpdated == true) getUserExperience();
  }, [isExperienceUpdated]);

  const addNewSkill = async (userID) => {
    if (newSkill != "") {
      var response = await addSkill(userID, newSkill);

      if (response) {
        await getSkillList(userID);
      }
    }
  };



  const handleRemoveSkillOnClick = async (id) => {
    var response = await removeSkill(id);
    if (response) {
      await getSkillList(userData.userID);
    }
  };


  useEffect(() => {
    addNewSkill(userData.userID);
  }, [newSkill]);

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
            <div
              className="pfp-wrap"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              onClick={onProfileClick}
            >
              <input
                hidden
                accept="image/png, image/jpeg"
                multiple
                type="file"
                ref={inputFile}
                onChange={handleImageChange}
              />
            <img src={image} alt="Avatar" className="profile-pic"></img>
            </div>

            <Grid container spacing={2}>
              <Grid className="name" item xs={12}>
                {userData.name}
              </Grid>
              <Grid className="bio" item xs={12}>
                {userData.bio}
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="header">
                  {t("EducationText")}
                  <AddEducationDialog
                    userID={userData.userID}
                    setIsExperienceUpdated={setIsExperienceUpdated}
                  />
                  <IconButton onClick={handleClickEnableEdit}>
                    <EditIcon className="profile-icon" />
                  </IconButton>
                </div>
                <hr className="line"></hr>
                {educationExperience !== null && (
                  <ExperienceList
                    experiences={educationExperience}
                    enable={enable}
                    setIsExperienceUpdated={setIsExperienceUpdated}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="header">
                  {t("ExperienceText")}
                  <AddExperienceDialog
                    userID={userData.userID}
                    setIsExperienceUpdated={setIsExperienceUpdated}
                  />
                  <IconButton onClick={handleClickEnableEdit}>
                    <EditIcon className="profile-icon" />
                  </IconButton>
                </div>
                <hr className="line"></hr>
                {workExperience !== null && (
                  <ExperienceList
                    experiences={workExperience}
                    enable={enable}
                    setIsExperienceUpdated={setIsExperienceUpdated}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  style={{ marginLeft: "1em" }}
                >
                  <Grid item md={6} xs={12}>
                    <div className="header">{t("SkillsText")}
                    <AddSkillDialog setNewSkill={setNewSkill} />
                    <IconButton onClick={handleClickEnableEdit}>
                      <EditIcon className="profile-icon" />
                    </IconButton>
                    </div>
                  </Grid>
                </Grid>
                <hr className="line"></hr>
                {skills.map((aSkill) => (
                  <div>
                    <Typography style={{ marginLeft: "5%" }} className="skill">
                      {aSkill[0]}
                      {enable && (
                        <span className="profile-item">
                          <IconButton
                            onClick={() => handleRemoveSkillOnClick(aSkill[1])}
                          >
                            <DeleteIcon className="profile-icon" />
                          </IconButton>
                        </span>
                      )}
                    </Typography>
                    <hr className="sub-line"></hr>
                  </div>
                ))}
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  style={{ marginLeft: "1em" }}
                >
                  <Grid item md={6} xs={12}>
                    <div className="header">{t("DocumentsText")}
                    <AddDocumentsDialog setFileData={setFileData} />
                    <IconButton onClick={handleClickEnableEdit}>
                      <EditIcon className="profile-icon" />
                    </IconButton>
                    </div>
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
                  <Grid iten xs={12}>
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

              <Grid item md={6} xs={12}>
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
          <ApplicationHistory></ApplicationHistory>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
