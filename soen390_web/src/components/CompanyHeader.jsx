import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyHeader.css";
import face from "../static/images/face1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import { FollowCompany, UnfollowCompany } from "../api/CompanyApi";

export default function CompanyHeader(props) {
    const { t } = useTranslation();
    const name = props.name;
    const picture = props.picture;
    const [followState, setFollowState] = useState(props.isFollowing);

    const handleFollowButtonOnclick = async () => {
        if (!followState) {
            let response = await FollowCompany(props.userId, props.companyId);

            if (response) {
                setFollowState(!followState);
                props.setIsFollowing(!followState);
            }
        } else {
            let response = await UnfollowCompany(props.userId, props.companyId);
            if (response) {
                setFollowState(!followState);
                props.setIsFollowing(!followState);
            }
        }
    };

    return (
        <div>
            <div className="HeaderContainer">
                <div className="topHeaderDiv">
                    <div className="avatarContainer">
                        <img src={picture} alt="Avatar" class="avatar"></img>
                    </div>

                    {props.userData &&
                        props.userData.userID == props.companyId && (
                            <div className="editButton">
                                <Button
                                    variant="contained"
                                    color="white"
                                    size="medium"
                                >
                                    <EditIcon></EditIcon>
                                    Edit
                                </Button>
                            </div>
                        )}
                </div>

                <div className="bottomHeaderDiv">
                    <div className="blankContainer"></div>
                    <div className="titleContainer">
                        <div className="company">{name}</div>
                        <div className="field">Software</div>
                        <div className="location">Montreal</div>
                    </div>
                    {props.userData && !props.userData.isCompany && (
                        <div className="editButton">
                            <Button
                                color="black"
                                size="large"
                                onClick={handleFollowButtonOnclick}
                            >
                                {followState && <PersonAddDisabledIcon />}
                                {!followState && <PersonAddAlt1Icon />}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
