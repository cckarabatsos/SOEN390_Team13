import React from "react";
import "../styles/components/Modal.css";

function Modal({ setOpenModal,viewDesc, viewPosition, viewLocation, viewSalary, viewContract, viewEmail, viewCompany }){


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
          <h1>{viewPosition}</h1>
        </div>
        <div className="body">
            <h3>{viewLocation}</h3>
            <h3>{viewCompany}</h3>
            <h3>{viewContract}</h3>
            <h3>{viewSalary}</h3>
          <h3>{viewDesc}</h3>
          <h4>{viewEmail}</h4><br></br><br></br><br></br><br></br>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
} export default Modal;