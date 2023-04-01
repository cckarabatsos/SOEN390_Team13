import React from "react";
import JobApplicationComponent from "../components/JobApplicationComponent";
import "../styles/components/JobApplication.css";

const JobApplication = () => {
  return (
    <div className="jobapplication">
      <div className="titlename">Application Form</div>
      <JobApplicationComponent />
    </div>
  );
};

export default JobApplication;
