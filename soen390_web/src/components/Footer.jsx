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

import "../styles/components/Footer.css";


const Footer = () => {
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
                     
          </span>          
          )}
          <h2>Linked Out @ 2023 </h2>
            
          
          
      </Toolbar>
    </AppBar>
  )
}

export default Footer