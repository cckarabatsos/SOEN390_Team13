import React, { useEffect, useState } from "react";
import "../styles/components/FileItem.css";
import CompanyHeader from "../components/CompanyHeader";
import CompanyDescription from "../components/CompanyDescription";
import CompanyApplicationList from "../components/CompanyApplicationList";
import CompanyJobPostings from "../components/CompanyJobPostings";
import "../styles/pages/CompanyProfilePage.css";
import { useLocation } from "react-router-dom";
import { findUserById } from "../api/UserProfileApi";

export default function CompanyProfilePage(props) {
  const { state } = useLocation();

  // might have to passs the whole user object as state easier!!
  const { picture, name, description, isFollowing, companyId } = state; // Read values passed on state
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [jobToDisplay, setJobToDisplay] = useState({});
  const [updateState, setUpdateState] = useState(false);

  const [isCompanyOwner, setIsCompanyOwnner] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [iscompany, setIsCompany] = useState(false);

  const getCompanyProfile = async (companyId, user) => {
    let company = await findUserById(companyId);
    if (company.data) {
      setCompanyData(company.data);
      if (userData && company.data.followers.includes(user.userID)) {
        setIsFollowingState(true);
      } else {
        setIsFollowingState(false);
      }
      if (userData) {
        if (user.userID == company.data.userID) {
          setIsCompanyOwnner(true);
          setIsCompany(true);
          setIsUser(false);
        } else if (user.isCompany) {
          setIsCompany(true);
          setIsCompanyOwnner(false);
          setIsUser(false);
        } else {
          setIsUser(true);
          setIsCompany(false);
          setIsCompanyOwnner(false);
        }
      }
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUserData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      setUserData(false);
    }

    console.log("about to re update company in company profile");
    getCompanyProfile(companyId, data);
  }, [isFollowingState, companyId, updateState]);

  //console.log("before re-render company in company profile")
  return (
    <div className="CompanyProfileContainer">
      <CompanyHeader
        name={companyData.name ? companyData.name : name}
        picture={companyData.picture ? companyData.picture : picture}
        userId={userData.userID}
        companyId={companyId}
        isFollowing={isFollowingState}
        setIsFollowing={setIsFollowingState}
        userData={userData}
        companyData={companyData}
        setUpdateFlag={setUpdateState}
        updateFlag={updateState}
      ></CompanyHeader>

      <CompanyDescription
        description={companyData.bio}
        setUpdateFlag={setUpdateState}
        updateFlag={updateState}
        userData={companyData}
        companyOwner={isCompanyOwner}
      ></CompanyDescription>

      <CompanyJobPostings
        openPositions={companyData.jobpostings}
        companyName={companyData.name}
        companyEmail={companyData.email}
        setUpdateFlag={setUpdateState}
        updateFlag={updateState}
        companyOwner={isCompanyOwner}
      ></CompanyJobPostings>
      {isCompanyOwner && (
        <CompanyApplicationList
          openPositions={companyData.jobpostings}
          companyName={companyData.name}
          companyEmail={companyData.email}
          setUpdateFlag={setUpdateState}
          updateFlag={updateState}
          userData={companyData}
        ></CompanyApplicationList>
      )}
    </div>
  );
}
