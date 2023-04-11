import {
  AppBar,
  Avatar,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import navlogo from "../assets/default_picture2.jpg";
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
      <AppBar
        position="static"
        style={{ background: "#ffffff", zIndex: 1301 }} // Add zIndex to the AppBar
      >
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
              <NavLinks userData={userData} />

              {userData && (
                <Stack spacing={1} direction="row">
                  <Link to={`/UserProfile/ `} className="avatar-link">
                    <Avatar
                      alt="User"
                      src={userData ? userData.picture : ""}
                      sx={{ width: 47, height: 47 }}
                    />
                  </Link>
                  <Link className="notification" to="/NotificationsPage">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon></NotificationsIcon>
                    </Badge>
                  </Link>
                </Stack>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
