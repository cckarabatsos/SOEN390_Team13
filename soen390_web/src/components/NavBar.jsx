import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import EastIcon from "@mui/icons-material/East";
import HomeIcon from "@mui/icons-material/Home";
import NorthIcon from "@mui/icons-material/North";
import OutputIcon from "@mui/icons-material/Output";
import WorkIcon from "@mui/icons-material/Work";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import navlogo from "../assets/linkedout logo navbar.png";
import "../styles/components/navbar.css";
import DrawerComponent from "./Drawer";

function Navbar(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userData = props.userData;
  const { t, i18n } = useTranslation();
  const signout = () => {
    localStorage.setItem("isAuth", null);
    window.dispatchEvent(new Event("storage"));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div data-testid="navbar-1">
      <AppBar position="static" style={{ background: "#BDBABA" }}>
        <CssBaseline />
        <Toolbar>
          <Link data-testid="home-1" to="/" className="logo">
            <img className="logo" src={navlogo} alt="LinkedOut" />
          </Link>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <span className="navlinks">
               {userData && (
              <Link data-testid="home-1" to="/NewsFeedPAge" className="link">
                {t("HomeText")} <HomeIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>
               )}
              <Link data-testid="job-1" to="/JobSearch" className="link">
                {t("jobsNavBar")}
                <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>
              

              {userData && (
                <>
                <Link data-testid="job-1" to="/UserNetworking" className="link">
                {t("NetworkingText")}
                <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>
                <Link data-testid="job-1" to="/UserConnection" className="link">
                {t("UserConnectionText")}
                  <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
                </Link>

                <Link data-testid="job-1" to="/Contacts" className="link">
                {t("ContactsText")}
                <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
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
                    {t("LoginText")}{" "}
                    <EastIcon className="icon" sx={{ color: "#9606D9" }} />
                  </Link>
                  <Link data-testid="signup-1" to="/Signup" className="link">
                  {t("SignUpText")}
                    <NorthIcon className="icon" sx={{ color: "#9606D9" }} />
                  </Link>
                </>
              ) : (
                <Link to="/" className="link" onClick={signout}>
                  {t("SignoutText")}
                  <OutputIcon className="icon" sx={{ color: "#9606D9" }} />
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
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
