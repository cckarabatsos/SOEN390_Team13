import React from "react";
import JobApplicationComponent from "../components/JobApplicationComponent";
import "../styles/components/JobApplication.css";

const JobApplication = (props) => {
  return (
    <div className="jobapplication">
      <div className="titlename">Application Form</div>
      <JobApplicationComponent userData={props.userData} />
    </div>
  );
};

export default JobApplication;
