import {
  AppBar,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import "../styles/components/navbar.css";
import DrawerComponent from "./Drawer";

import "../styles/components/Footer.css";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div data-testid="footer-1">
      <AppBar
        className="border"
        position="static"
        style={{ background: "#BDBABA" }}
      >
        <CssBaseline />
        <Toolbar className="border">
          {isMobile ? <DrawerComponent /> : <span className="navlinks"></span>}
          <h2>Linked Out @ 2023 </h2>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
