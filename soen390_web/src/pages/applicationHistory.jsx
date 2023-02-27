import React, { useEffect, useState } from "react";
import JobPostingComponent from "../components/JobPostingComponent";
import "../styles/components/applicationHistory.css";


/*function ApplicationHistory() {
  return (
    <div className="application-history">
      <h1>My Applications </h1>
      <JobPostingComponent

        position={"software engineer"}
        location={"mtl"}
        company={"BRP"}
        contract={"100 000$"}
        jobPosterID={1}
      />
      
    </div>
  );
} */

function ApplicationHistory() {
  const position = 'software engineer';
  const company = 'BRP';
  const location = 'mtl';
  const contract = '100 000$';

  return (
    <div className="application-history-container">
      <div className="application-history-list">
        <div className="application-history-header">
          <h1 className="application-history-title">My Applications</h1>
          <h2 className="application-history-subtitle">Thank you for completing your applications</h2>
        </div>
        <JobPostingComponent
          position={position}
          company={company}
          location={location}
          contract={contract}
          jobPosterID={1}
        />
      </div>
    </div>
  );
}


export default ApplicationHistory;