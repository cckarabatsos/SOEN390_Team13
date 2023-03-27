import React from "react";
import "../styles/components/CompanySearchComponent.css";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import face from "../static/images/google.png";
import { useNavigate } from "react-router-dom";

//const navigate = useNavigate();
//navigate('/other-page', { state: { id: 7, color: 'green' } });

//const {state} = useLocation();
//const { id, color } = state; // Read values passed on state

export default function CompanySearchComponent(props) {
  const navigate = useNavigate();

  const location = props.location;
  const name = props.name;
  const followerCount = props.followerCount;
  const id = props.id;
  const setCompany = props.setJob;
  const email = props.email;
  const picture = props.picture;
  const state = props.state;
  const description = props.description;
  const isFollowing = props.isFollowing;
  const companyId = props.companyId;

  const { t } = useTranslation();

  console.log(props.name);

  const handleOnClick = () => {
    navigate("/CompanyProfile", {
      state: {
        picture: picture,
        name: name,
        description: description,
        isFollowing: isFollowing,
        companyId: companyId,
      },
    });
  };

  // display company component, position, company, location, contract
  return (
    <div className="companyContainer">
      <div className="innerContainerCompany">
        <div className="logoContainer">
          <img src={picture} alt="logo" class="logoCompany"></img>
        </div>

        <div className="titleContainer">
          <div className="button-viewprofile-position">
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={handleOnClick}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {t("MoreInfoText")}
            </Button>
          </div>

          <div className="companyName">{name}</div>
          <div className="companyFollowers">{followerCount + " "}Followers</div>
          <div className="companyLocation">{location}</div>
        </div>
      </div>
    </div>
  );
}
