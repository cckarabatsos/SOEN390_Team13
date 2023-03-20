import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Modal.css";
import { useTranslation } from "react-i18next";

function Modal({
  setOpenModal,
  viewDesc,
  viewPosition,
  viewLocation,
  viewSalary,
  viewContract,
  viewEmail,
  viewCompany,
  viewMandatoryResume,
  viewMandatoryCoverLetter,
  viewPostingDeadline
}) 

{
const { t } = useTranslation();

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Position: {viewPosition}</h1>
        </div>
        <div className="body">
          <p style={{ fontSize: "24px"}}>{viewCompany}</p>
          <p style={{ marginBottom: "10px"}}>Location: {viewLocation}</p>
          <p style={{borderTop: "1px solid #ccc"}}></p>
          <p style={{marginTop: "10px",fontSize: "24px"}}>Job Description</p>
          <p>{viewDesc}</p>
          <p>{viewContract}</p>
          <p>Salary: ${viewSalary}/hr</p>
          <p>Contact: {viewEmail}</p>
          <p>Mandatory resume: {viewMandatoryResume ? 'Yes' : 'No'}</p>
          <p>Mandatory cover letter: {viewMandatoryCoverLetter ? 'Yes' : 'No'}</p>
          <p>Deadline to apply: {viewPostingDeadline}</p>
        </div>
        <div>
          <button
            onClick={() => {
              
              // state of modal set to closed when cancel button is clicked
              setOpenModal(false); 
            }}
            id="cancelBtn"
          >
            {t("CancelText")} 
          </button>
          
          <Link // Link component for the apply button
          id="applyBtn" style={{width:"150px", height:"45px",
        display: "inline-block", textDecoration: "none", 
        border: "2px solid #8f8aff", color: "black", 
        backgroundColor:"white",
        fontWeight:"normal",
        borderRadius: "8px", textAlign: "center", 
        lineHeight: "39px" }}  to="/JobApplication"> {t("ApplyText")} </Link>
        </div>
      </div>
    </div>
  );
}
export default Modal;
