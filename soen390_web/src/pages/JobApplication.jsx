import React from "react";
import JobApplicationFill from "../components/JobApplicationFill";
import "../styles/components/JobApplication.css";

const JobApplication = (props) => {
  return (
    <div className="jobapplication">
      <div className="titlename">Application Form</div>
      <JobApplicationFill userData={props.userData} />
    </div>
  );
};

export default JobApplication;
