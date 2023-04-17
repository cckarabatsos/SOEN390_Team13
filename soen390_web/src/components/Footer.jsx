import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";
import React from "react";
import "../styles/components/navbar.css";

const Footer = () => {
  return (
    <div data-testid="footer-1">
      <AppBar
        className="border"
        style={{
          background: "#6C63FF",
          position: "static",
          bottom: 0,
          width: "100%",
          height:"60px",
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
