import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Modal.css";

function Modal({
  setOpenModal,
  viewDesc,
  viewPosition,
  viewLocation,
  viewSalary,
  viewContract,
  viewEmail,
  viewCompany,
}) {
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
          <h3>{viewCompany}</h3>
          <h3>{viewLocation}</h3>
          <h3>{viewContract}</h3>
          <h3>{viewSalary}</h3>
          <p>{viewDesc}</p>
          <h4>{viewEmail}</h4>
        </div>
        <div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <Link id="applyBtn"  to="/JobApplication"> Apply </Link>
        </div>
      </div>
    </div>
  );
}
export default Modal;
