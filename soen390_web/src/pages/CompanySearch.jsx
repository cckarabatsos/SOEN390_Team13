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

  useEffect(() => {
    var companyArray = [];

    for (var i = 0; i < companies.length; i++) {
      companyArray.push(
        new Company(
          companies[i].name,
          companies[i].followers.length,
          companies[i].email,
          companies[i].bio,
          companies[i].picture,
          companies[i].location,
          i
        )
      );
    }
    setCompanyDisplay(companyArray);
  }, [companies]);

  return (
    <div>
      <div data-testid="job-posting">
        <div className="jobSearchingText">
          <p>{t("FindCompanyLabel")}</p>
        </div>
        <div className="desiredJobText">
          <p>{t("DesiredCompany")}</p>
        </div>
        <CompanySearchBar setCompanies={setCompanies} />

        {companyDisplay.map((company) => (
          <CompanySearchComponent
            key={company.id}
            name={company.companyName}
            location="New York, NY"
            followerCount={company.followerCount}
            picture={company.pictureURL}
            description={company.description}
          ></CompanySearchComponent>
        ))}
      </div>
    </div>
  );
}
