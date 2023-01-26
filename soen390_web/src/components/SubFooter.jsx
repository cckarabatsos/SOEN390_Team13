import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link} from "react-router-dom";
import DrawerComponent from "./Drawer";
import "../styles/components/navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import navlogo from '../assets/linkedout logo navbar.png'
import WorkIcon from '@mui/icons-material/Work';
import EastIcon from '@mui/icons-material/East';
import NorthIcon from '@mui/icons-material/North';
import "../styles/components/SubFooter.css"


function SubFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar className="border" position="static" style={{ background: '#BDBABA' }}>
      <CssBaseline />
      <Toolbar className="border">      
        {isMobile ? (
            <DrawerComponent />
        ) : (
          <span className="navlinks">  
          <img className="Logo" src={navlogo} alt="LinkedOut"/>           
          </span>          
          )}
          <h5 className="Section1">About Us <br></br> 
          Privacy Settings<br></br>
          Guidelines <br></br>
          Mobile<br></br></h5>
          <h5 className="Section2">Careers<br></br>
          Accessibility<br></br>
          Advertising<br></br>
          Sales<br></br></h5> 
          <h5 className="Section3">Businesses<br></br>
          Solutions<br></br>
          Contact Us <br></br>
          Marketing</h5>  
          
          
      </Toolbar>
    </AppBar>
  );
        
}
export default SubFooter;