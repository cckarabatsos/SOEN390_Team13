import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import SubFooter from "../components/SubFooter"
import background from "../assets/profile_background.svg"
import "../styles/components/UserProfile.css"
import picture from "../assets/default_picture.jpg"
import { Grid, Typography } from "@material-ui/core";
import Concordia from "../assets/UserProfileImages/Concordia.png"
import AmazonLogo from "../assets/UserProfileImages/amazon-logo-square.jpg"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddEducationDialog from "../components/AddEducationDialog";
import AddExperienceDialog from "../components/AddExperienceDialog";
import AddSkillDialog from "../components/AddSkillDialog"

function UserProfile(props) {

  
    return (
        <>
            <NavBar/>
            <div className="background-color">
                <div className="background-image" style={{ 
                backgroundImage: `url(${background})` 
                }}>
                    <div className="foreground-colour">
                        <img className="profile-pic" src={picture}></img>
                        <Grid container spacing={2}>
                            <Grid className="name" item xs={12}>
                                FIRST NAME LAST NAME
                            </Grid>
                            <Grid className="bio" item xs={12}>
                                Software Engineering Student at Concordia University
                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    Education <AddEducationDialog/> <EditIcon className="profile-icon"/>
                                </div>
                                <hr className="line"></hr>
                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ margin: "1em"}}
                                >
                                <Grid item xs={2}>
                                    <Grid style={{ height: "100%" }}>
                                        <img className="education-picture" src={Concordia} alt="Amazon" />
                                    </Grid>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography style={{textAlign:"left", fontWeight:"Bold", fontSize: "large"}}>
                                        Concordia University
                                    </Typography>
                                    <Typography style={{textAlign:"left"}}>
                                        Bachelor of Engineering - BE, Software Engineering
                                    </Typography>
                                    <Typography style={{textAlign:"left", fontSize:"small"}}>
                                        2020 - 2024
                                    </Typography>
                                </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    Experience <AddExperienceDialog/> <EditIcon className="profile-icon"/>
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
                                        <img className="education-picture" src={AmazonLogo} alt="Concordia" />
                                    </Grid>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography style={{textAlign:"left", fontWeight:"Bold", fontSize: "large"}}>
                                        Software Development Engineer Intern
                                    </Typography>
                                    <Typography style={{textAlign:"left"}}>
                                        Amazon
                                    </Typography>
                                    <Typography style={{textAlign:"left"}}>
                                        Vancouver, BC, Canada
                                    </Typography>
                                    <Typography style={{textAlign:"left", fontSize:"small"}}>
                                        May 2022 - August 2022
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    Skills <AddSkillDialog/> <EditIcon className="profile-icon"/>
                                </div>
                                <hr className="line"></hr>
                                <Typography style={{marginLeft:"5%"}} className="skill">
                                    Java
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography style={{marginLeft:"5%"}} className="skill">
                                    Python
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography style={{marginLeft:"5%"}} className="skill">
                                    JavaScript
                                </Typography>
                                <hr className="sub-line"></hr>
                                <Typography style={{marginLeft:"5%"}} className="skill">
                                    Software Testing
                                </Typography>
                                <hr className="sub-line"></hr>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

            

            <SubFooter/>
            <Footer/>
        </>
    )
}

export default UserProfile