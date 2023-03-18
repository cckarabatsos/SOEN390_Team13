import React from "react";
import "../styles/components/FileItem.css";
import CompanyHeader from "../components/CompanyHeader";
import CompanyDescription from "../components/CompanyDescription";
import CompanyApplicationList from "../components/CompanyApplicationList";
import CompanyJobPostings from "../components/CompanyJobPostings";
import "../styles/pages/CompanyProfilePage.css";
import { useLocation } from "react-router-dom";

export default function CompanyProfilePage(props) {
  const { state } = useLocation();
  const { picture, name, description } = state; // Read values passed on state

  return (
    <div className="CompanyProfileContainer">
      <CompanyHeader name={name} picture={picture}></CompanyHeader>
      <CompanyDescription description={description}></CompanyDescription>
      <CompanyJobPostings></CompanyJobPostings>
      <CompanyApplicationList></CompanyApplicationList>
    </div>
  );
}
