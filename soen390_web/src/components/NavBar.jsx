import {
  AppBar,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
  Avatar
} from "@material-ui/core";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import navlogo from "../assets/default_picture2.jpg";
import SearchBar from "../components/SearchBar";
import "../styles/components/navbar.css";
import DrawerComponent from "./Drawer";
import NavLinks from "./NavLinks";

function Navbar(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userData = props.userData;
  const searchBarRef = useRef(null);

  const { t, i18n } = useTranslation();

  const handleSearch = async () => {
    console.log("hi");
  };

  return (
    <div data-testid="navbar-1">
      <AppBar position="static" style={{ background: "#ffffff" }}>
        <CssBaseline />
        <Toolbar className="navbar-toolbar">
          {isMobile ? (
            <DrawerComponent userData={userData} />
          ) : (
            <>
              <Link
                data-testid="home-1"
                to={userData ? "/UserProfile" : "/"}
                className="logo"
              >
                <img className="logo" src={navlogo} alt="LinkedOut" />
              </Link>
              <SearchBar ref={searchBarRef} onSearchBtnClick={handleSearch} />
              <NavLinks userData={userData} />
              <Avatar  alt="User" src={userData? userData.picture : ""}  sx={{ width: 47, height: 47 }} />
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
