import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
 makeStyles
} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import "../styles/components/Drawer.css"

const useStyles = makeStyles(()=>({
    paper: {
        background: '#BDBABA'
    }
}));

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <List>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className="drawer-link" to="/">Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className="drawer-link" to="/Jobs">Jobs</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className="drawer-link" to="/Login">Login</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className="drawer-link" to="/Signup">Signup</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton className="menu-icon" onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className="icon" />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
