import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyHeader.css";
import face from "../static/images/face1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function CompanyHeader(props) {
  const { t } = useTranslation();
  const name = props.name;
  const picture= props.picture;

  return (
    <div>
      <div className="HeaderContainer">
        <div className="topHeaderDiv">
          <div className="avatarContainer">
            <img src={picture} alt="Avatar" class="avatar"></img>
          </div>
          <div className="editButton">
            <Button variant="contained" color="white" size="medium">
              <EditIcon></EditIcon>
              Edit
            </Button>
          </div>
        </div>

        <div className="bottomHeaderDiv">
          <div className="blankContainer"></div>
          <div className="titleContainer">
            <div className="company">{name}</div>
            <div className="field">Software</div>
            <div className="location">Montreal</div>

           
          </div>
          <div className="editButton">
            <Button color="black" size="large">
              <PersonAddAlt1Icon/>
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
