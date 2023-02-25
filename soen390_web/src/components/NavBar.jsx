import {
  AppBar,
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
import React from "react";
import { Link } from "react-router-dom";
import navlogo from "../assets/linkedout logo navbar.png";
import "../styles/components/navbar.css";
import DrawerComponent from "./Drawer";

function Navbar(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userData = props.userData;

  const signout = () => {
    localStorage.setItem("isAuth", null);
    window.dispatchEvent(new Event("storage"));
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
              <Link data-testid="home-1" to="/" className="link">
                Home <HomeIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>
              <Link data-testid="job-1" to="/JobSearch" className="link">
                Jobs <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>
              <Link data-testid="job-1" to="/UserNetworking" className="link">
                Networking
                <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
              </Link>

              {userData && (
                <Link data-testid="job-1" to="/UserConnection" className="link">
                  User Connection
                  <WorkIcon className="icon" sx={{ color: "#9606D9" }} />
                </Link>
              )}

              {!userData ? (
                <>
                  <Link
                    data-testid="login-1"
                    to="/UserProfile"
                    className="link"
                  >
                    Login{" "}
                    <EastIcon className="icon" sx={{ color: "#9606D9" }} />
                  </Link>
                  <Link data-testid="signup-1" to="/Signup" className="link">
                    Signup
                    <NorthIcon className="icon" sx={{ color: "#9606D9" }} />
                  </Link>
                </>
              ) : (
                <Link to="/" className="link" onClick={signout}>
                  Signout
                  <OutputIcon className="icon" sx={{ color: "#9606D9" }} />
                </Link>
              )}
            </span>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
