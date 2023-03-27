import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CompanySearchBar } from "../components/CompanySearchBar";
import "../styles/components/CompanySearchPage.css";
import Company from "../models/Company.ts";
import CompanySearchComponent from "../components/CompanySearchComponent";

import { useNavigate } from "react-router-dom";

export default function CompanySearch() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);
  const [companyDisplay, setCompanyDisplay] = useState([]);
  const [userData, setUserData] = useState({});

  const setState = (data) => {
    console.log(data.userID);

    setUserData(data);
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

    //console.log(Array);

    setCompanyDisplay(companyArray);
  }, [companies]);

  if (companies) {
    console.log(companyDisplay);
  }

  return (
    <div>
      <div data-testid="company-posting">
        <div className="companySearchingText">
          <p>{t("FindCompanyLabel")}</p>
        </div>
        <div className="desiredCompanyText">
          <p>{t("DesiredCompany")}</p>
        </div>
        <CompanySearchBar setCompanies={setCompanies} />
      </div>

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
  );
}
