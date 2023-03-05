import {
  AppBar,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import navlogo from "../assets/default_picture2.jpg";
import "../styles/components/navbar.css";
import "../styles/components/SubFooter.css";
import DrawerComponent from "./Drawer";
import { useTranslation } from "react-i18next";

function SubFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  return (
    <>
      <div
        data-testid="subfooter-1"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <AppBar
          className="border"
          position="static"
          style={{ background: "#ffffff" }}
        >
          <CssBaseline />
          <Toolbar className="border">
            {isMobile ? (
              <DrawerComponent />
            ) : (
              <span className="navlinks">
                <img className="Logo" src={navlogo} alt="LinkedOut" />
              </span>
            )}
            <h5 className="Section1">
              {t("AboutUsText")} <br></br>
              {t("PrivacySettingsText")}
              <br></br>
              {t("GuidelinesText")} <br></br>
              Mobile<br></br>
            </h5>
            <h5 className="Section2">
              {t("CareersText")}
              <br></br>
              {t("AccessText")}
              <br></br>
              {t("AdvertisingText")}
              <br></br>
              {t("SalesText")}
              <br></br>
            </h5>
            <h5 className="Section3">
              {t("BusinessText")}
              <br></br>
              Solutions<br></br>
              {t("ContactText")} <br></br>
              Marketing
            </h5>
          </Toolbar>
          <Toolbar className="border">
            {isMobile ? (
              <DrawerComponent />
            ) : (
              <span className="navlinks"></span>
            )}
            <div data-testid="footer-1">
              <h2>Linked Out @ 2023 </h2>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
export default SubFooter;
