import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";
import React from "react";
import "../styles/components/navbar.css";
import "../styles/components/Footer.css";

const Footer = () => {
  return (
    <div data-testid="footer-1">
      <AppBar
        className="border"
        position="static"
        style={{
          background: "#BDBABA",
          position: "static",
          bottom: 0,
          width: "100%",
        }}
      >
        <CssBaseline />
        <Toolbar className="border">
          {/* {isMobile ? <DrawerComponent /> : <span className="navlinks"></span>} */}
          <h2>Linked Out @ 2023 </h2>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
