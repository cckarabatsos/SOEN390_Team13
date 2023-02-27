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

 /* function ApplicationHistory() {
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
} */




function ApplicationHistory() {
  const positions = ["Software Engineer", "Frontend Developer", "Backend Developer"];
  const companies = ["BRP", "Google", "Microsoft"];
  const locations = ["Montreal", "San Francisco", "Seattle"];
  const contracts = ["$100,000", "$120,000", "$150,000"];

  const [showOptions, setShowOptions] = useState(Array(positions.length).fill(false));

  const handleOptionsClick = (index) => {
    const newOptions = [...showOptions];
    newOptions[index] = !newOptions[index];
    setShowOptions(newOptions);
  };

  return (
    <div className="application-history-container">
      <h1>My Applications</h1>
      <h2>Thank you for applying to these positions</h2>
      <div className="application-history-list">
        <div className="column">
          <h2 className="application-history-title">Position</h2>
          {positions.map((position, index) => (
            <p key={index}>{position}</p>
          ))}
        </div>
        <div className="column">
          <h2 className="application-history-title">Company</h2>
          {companies.map((company, index) => (
            <p key={index}>{company}</p>
          ))}
        </div>
        <div className="column">
          <h2 className="application-history-title">Location</h2>
          {locations.map((location, index) => (
            <p key={index}>{location}</p>
          ))}
        </div>
        <div className="column">
          <h2 className="application-history-title">Contract</h2>
          {contracts.map((contract, index) => (
            <p key={index}>{contract}</p>
          ))}
        </div>
        <div className="column">
          <h2 className="application-history-title">Action</h2>
          {positions.map((_, index) => (
            <div key={index} className="action-container">
              <button onClick={() => handleOptionsClick(index)}>...</button>
              {showOptions[index] && (
                <div className="options-container">
                  <button>View Application</button>
                  <button>Withdraw Application</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






export default ApplicationHistory;