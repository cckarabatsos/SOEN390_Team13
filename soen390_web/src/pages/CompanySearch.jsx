import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CompanySearchBar } from "../components/CompanySearchBar";
import CompanySearchComponent from "../components/CompanySearchComponent";
import Company from "../models/Company.ts";
import "../styles/components/CompanySearchPage.css";

export default function CompanySearch() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);
  const [companyDisplay, setCompanyDisplay] = useState([]);
  const [userData, setUserData] = useState({});

  const setState = (data) => {
    if(data){
      setUserData(data);
    }

  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != {}) {
      setState(data);
    } else {
      setUserData(false);
    }
  }, []);

  useEffect(() => {
    var companyArray = [];

    for (var i = 0; i < companies.length; i++) {
      let isFollowing = false;

      if (userData.userID && companies[i].followers.includes(userData.userID)) {
        isFollowing = true;
      }

      companyArray.push(
        new Company(
          companies[i].name,
          companies[i].followers.length,
          companies[i].email,
          companies[i].bio,
          companies[i].picture,
          companies[i].location,
          i,
          isFollowing,
          companies[i].userID
        )
      );
    }
    setCompanyDisplay(companyArray);
  }, [companies]);

  return (
    <div>
      <div data-testid="job-posting">
        <div className="companySearchingText">
          <p>{t("FindCompanyLabel")}</p>
        </div>
        <div className="desiredCompanyText">
          <p>{t("DesiredCompany")}</p>
        </div>
        <CompanySearchBar setCompanies={setCompanies} />

        {companyDisplay.length == 0 &&
          <div className="noCompaniesFound">No companies found</div>
        }
        
      {companyDisplay.map((company) => (
        <CompanySearchComponent
          key={company.id}
          name={company.companyName}
          location="New York, NY"
          followerCount={company.followerCount}
          picture={company.pictureURL}
          description={company.description}
          isFollowing={company.followCompany}
          companyId={company.companyId}
        ></CompanySearchComponent>
      ))}
      </div>
    </div>
  );
}
