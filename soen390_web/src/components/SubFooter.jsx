import {
  AppBar,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import navlogo from "../assets/linkedout logo navbar.png";
import "../styles/components/navbar.css";
import "../styles/components/SubFooter.css";
import DrawerComponent from "./Drawer";

function SubFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div data-testid='subfooter-1'>
    <AppBar
      className="border"
      position="static"
      style={{ background: "#BDBABA" }}
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
          About Us <br></br>
          Privacy Settings<br></br>
          Guidelines <br></br>
          Mobile<br></br>
        </h5>
        <h5 className="Section2">
          Careers<br></br>
          Accessibility<br></br>
          Advertising<br></br>
          Sales<br></br>
        </h5>
        <h5 className="Section3">
          Businesses<br></br>
          Solutions<br></br>
          Contact Us <br></br>
          Marketing
        </h5>
      </Toolbar>
    </AppBar>
    </div>
  );
}
export default SubFooter;
