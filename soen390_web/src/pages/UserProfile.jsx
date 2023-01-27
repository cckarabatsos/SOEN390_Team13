import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import SubFooter from "../components/SubFooter"
import background from "../assets/profile_background.svg"
import "../styles/components/UserProfile.css"
import picture from "../assets/default_picture.jpg"
import { Grid } from "@material-ui/core";
import Concordia from "../assets/UserProfileImages/Concordia.png"
import AmazonLogo from "../assets/UserProfileImages/amazon-logo-square.jpg"

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
                                    Education
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
                                    <Grid container spacing={3}>
                                        <Grid className="institute-name" item xs={12}>
                                            Concordia University
                                        </Grid>
                                        <Grid className="program-name" item xs={12}>
                                            Bachelor of Engineering - BE, Software Engineering
                                        </Grid>
                                        <Grid className="year" item xs={12}>
                                            2020 - 2024
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    Experience
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
                                    <Grid container spacing={2}>
                                        <Grid className="position-name" item xs={12}>
                                            Software Development Engineer Intern
                                        </Grid>
                                        <Grid className="company-name" item xs={12}>
                                            Amazon
                                        </Grid>
                                        <Grid className="year" item xs={12}>
                                            May 2022 - August 2022
                                        </Grid>
                                        <Grid className="location" item xs={12}>
                                            Vancouver, BC, Canada
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="header">
                                    Skills
                                </div>
                                <hr className="line"></hr>
                                <Grid item xs={12}>
                                    Java
                                    <hr className="sub-line"></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    Python
                                    <hr className="sub-line"></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    JavaScript
                                    <hr className="sub-line"></hr>
                                </Grid>
                                
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