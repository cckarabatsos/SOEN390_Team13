import {
  AppBar,
  Avatar,
  Button,
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
import { Link ,useNavigate} from "react-router-dom";
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
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/CompanyProfile", {
        state: {
            picture: userData.picture,
            name: userData.name,
            description: userData.bio,
            isFollowing: false,
            companyId: userData.userID,
        },
    });
};


  return (
    <div data-testid="navbar-1">
      <AppBar
        position="static"
        style={{ background: "#ffffff", zIndex: 20,top:0 }} // Add zIndex to the AppBar
      >
        <CssBaseline />
        <Toolbar className="navbar-toolbar">
          {isMobile ? (
            <DrawerComponent userData={userData} />
          ) : (
            <>
              
                <img className="logo" src={navlogo} alt="LinkedOut" />
          
              <NavLinks userData={userData} />

              {userData && (
                <Stack spacing={1} direction="row">
                  {userData.isCompany &&(
                    <Button
                    onClick={handleOnClick}>
                       <Avatar
                      alt="User"
                      src={userData ? userData.picture : ""}
                      sx={{ width: 47, height: 47 }}
                      
                    />


                    </Button>
                  )}
                  {!userData.isCompany &&(
                    <Link to={"/UserProfile"} className="avatar-link">

                    <Avatar
                      alt="User"
                      src={userData ? userData.picture : ""}
                      sx={{ width: 47, height: 47 }}
                      
                    />
                  </Link>


                  )}
                  
                  <Link className="notification" to="/NotificationsPage">
                    <Badge badgeContent={userData.notifications.length} color="secondary">
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
