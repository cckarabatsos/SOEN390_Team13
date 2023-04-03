import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/components/CompanySearchComponent.css";

export default function UserSearchComponent(props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  //console.log(props);

  // const handleOnClick = () => {
  //   navigate("/UserProfile/" + props.id);
  // };

  return (
    <div key={props.id} className="companyContainer">
      <div className="innerContainerCompany">
        <div className="logoContainer">
          <img src={props.image} alt="logo" class="logoCompany"></img>
        </div>

        <div className="titleContainer">
          <div className="button-viewprofile-position">
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={() => navigate("/UserProfile/" + props.id)}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {t("MoreInfoText")}
            </Button>
            <Button
              className="button-viewProfile"
              variant="contained"
              onClick={() => navigate("/Messages/" + props.id)}
              style={{
                borderRadius: 27,
                border: "2px solid #006AF9",
                fontSize: "15px",
              }}
            >
              {t("Message")}
            </Button>
          </div>
          <div className="companyName">{props.name}</div>
          {props.contact && (
          <div className="companyFollowers">
            {props.contact.length} Followers
          </div>
          )}
          <div className="companySubName">{props.position}</div>
          <div className="companySubName">{props.company}</div>
        </div>
      </div>
    </div>
  );
}
