import '../styles/components/JobApplication.css'
import JobApplicationComponent from "../components/JobApplicationComponent";
import AddDocumentsDialog from "../components/AddDocumentsDialog";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetFile } from "../api/UserStorageApi";

const JobApplication = () => {
    

  return (
    <div className="jobapplication">
    <div className="titlename">Application Form</div>
    <JobApplicationComponent />    
    </div>
  )
}

export default JobApplication