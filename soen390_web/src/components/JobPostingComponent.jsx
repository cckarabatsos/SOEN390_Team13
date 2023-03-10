import React from "react";
import "../styles/components/JobPostingComponent.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
function JobPostingComponent(props) {
  const position = props.position;
  const location = props.location;
  const company = props.company;
  const contract = props.contract;
  const viewDesc = props.viewDesc;
  const jobPosterID = props.jobPosterID;
  const setJob = props.setJob;
  const { t } = useTranslation();

  return (
    <div className="container">
      <div>
        <div className="button-moreinfo-position"> 
          <Button
            className="button-moreinfo"
            variant="contained"
            onClick={() => {
              setJob(jobPosterID);
              viewDesc(true);
            }}
            style={{
              borderRadius: 27,
              border: "2px solid #8f8aff",
              fontSize: "15px",
            }}
          >
            {t("MoreInfoText")}
          </Button>
        </div>

        <div className="position">{position}</div>
        <div className="company">{company}</div>
        <div className="location">{location}</div>
        <div className="contract">{contract}</div>
      </div>
    </div>
  );
}
export default JobPostingComponent;
