import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import navlogo from "../assets/default_picture2.jpg";
import SearchBar from "../components/SearchBar";
import "../styles/components/navbar.css";
import DrawerComponent from "./Drawer";

function Navbar(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userData = props.userData;
  const searchBarRef = useRef(null);

  const { t, i18n } = useTranslation();
  const signout = () => {
    localStorage.setItem("isAuth", null);
    window.dispatchEvent(new Event("storage"));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const handleSearch = async () => {
    console.log("hi");
  };

  return (
    <div data-testid="navbar-1">
      <AppBar position="static" style={{ background: "#ffffff" }}>
        <CssBaseline />
        <Toolbar>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <>
              <Link
                data-testid="home-1"
                to={userData ? "/JobApplication" : "/"}
                className="logo"
              >
                <img className="logo" src={navlogo} alt="LinkedOut" />
              </Link>
              <SearchBar ref={searchBarRef} onSearchBtnClick={handleSearch} />
              <span className="navlinks">
                {userData && (
                  <Link
                    data-testid="home-1"
                    to="/NewsFeedPage"
                    className="link"
                  >
                    {t("HomeText")}
                  </Link>
                )}
                <Link data-testid="job-1" to="/JobSearch" className="link">
                  {t("jobsNavBar")}
                </Link>

                {userData && (
                  <>
                    <Link
                      data-testid="job-1"
                      to="/UserNetworking"
                      className="link"
                    >
                      {t("NetworkingText")}
                    </Link>
                    <Link
                      data-testid="job-1"
                      to="/UserConnection"
                      className="link"
                    >
                      {t("UserConnectionText")}
                    </Link>

                    <Link data-testid="job-1" to="/Contacts" className="link">
                      {t("ContactsText")}
                    </Link>
                  </>
                )}

                {!userData ? (
                  <>
                    <Link
                      data-testid="login-1"
                      to="/UserProfile"
                      className="link"
                    >
                      {t("LoginText")}
                    </Link>
                    <Link data-testid="signup-1" to="/Signup" className="link">
                      {t("SignUpText")}
                    </Link>
                  </>
                ) : (
                  <Link to="/" className="link" onClick={signout}>
                    {t("SignoutText")}
                  </Link>
                )}
                {i18n.language !== "en" ? (
                  <Button
                    color="inherit"
                    onClick={() => changeLanguage("en")}
                    className="link-button"
                  >
                    EN
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    onClick={() => changeLanguage("fr")}
                    className="link-button"
                  >
                    FR
                  </Button>
                )}
              </span>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
