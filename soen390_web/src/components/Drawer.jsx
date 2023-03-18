import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/components/Drawer.css";

const useStyles = makeStyles(() => ({
  paper: {
    background: "#FFFFFF",
    width: "20%",
  },
}));

function DrawerComponent(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const userData = props.userData;
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const signout = () => {
    localStorage.setItem("isAuth", null);
    window.dispatchEvent(new Event("storage"));
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div data-testid="drawer-1">
      <>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          classes={{ paper: classes.paper }}
        >
          <List>
            <Link data-testid="job-1" to="/JobSearch">
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={t("jobsNavBar")} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link data-testid="job-1" to="/Search">
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={t("searchNavBar")} />
                </ListItemButton>
              </ListItem>
            </Link>
            {userData && (
              <>
                <Link data-testid="job-1" to="/UserNetworking">
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={t("NetworkingText")} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link data-testid="job-1" to="/UserConnection">
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={t("UserConnectionText")} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link data-testid="job-1" to="/Contacts">
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={t("ContactsText")} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            )}

            {userData && userData.isAdmin && (
              <Link data-testid="job-1" to="/Admin">
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={t("Admin")} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            {!userData ? (
              <>
                <Link data-testid="login-1" to="/UserProfile">
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={t("LoginText")} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link data-testid="signup-1" to="/Signup">
                  <ListItem>
                    <ListItemButton>
                      <ListItemText primary={t("SignUpText")} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : (
              <Link to="/" className="link" onClick={signout}>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={t("SignoutText")} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}

            {i18n.language !== "en" ? (
              <ListItem>
                <ListItemButton onClick={() => changeLanguage("en")}>
                  <ListItemText primary="EN" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem>
                <ListItemButton onClick={() => changeLanguage("fr")}>
                  <ListItemText primary="FR" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Drawer>
        <IconButton
          className="menu-icon"
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon className="icon" />
        </IconButton>
      </>
    </div>
  );
}
export default DrawerComponent;
