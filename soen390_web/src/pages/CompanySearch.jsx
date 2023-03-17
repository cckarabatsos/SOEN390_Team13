import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CompanySearchBar } from "../components/CompanySearchBar";
import "../styles/components/CompanySearchPage.css";

export default function CompanySearch() {
  const { t } = useTranslation();

  return (
    <div>
      <div data-testid="company-posting">
        <div className="companySearchingText">
          <p>{t("FindCompanyLabel")}</p>
        </div>
        <div className="desiredCompanyText">
          <p>{t("DesiredCompany")}</p>
        </div>
        <CompanySearchBar />
      </div>

    </div>
  );
}
