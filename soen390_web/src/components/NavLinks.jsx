import { Grid, Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

function NavLinks(props) {
  const userData = props.userData;
  const { t, i18n } = useTranslation();

  const signout = () => {
    localStorage.setItem("isAuth", null);
    window.dispatchEvent(new Event("storage"));
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
      wrap="nowrap"
    >
      <Grid item>
        <Link data-testid="job-1" to="/Search" className="link">
          {t("searchNavBar")}
        </Link>
      </Grid>
      {userData && (
        <>
          {/* <Grid item>
            <Link data-testid="job-1" to="/UserNetworking" className="link">
              {t("NetworkingText")}
            </Link>
          </Grid> */}
          {!userData.isCompany && (
            <>
              <Grid item>
                <Link data-testid="job-1" to="/UserConnection" className="link">
                  {t("UserConnectionText")}
                </Link>
              </Grid>
              <Grid item>
                <Link data-testid="job-1" to="/Contacts" className="link">
                  {t("ContactsText")}
                </Link>
              </Grid>
            </>
          )}

          <Grid item>
            <Link data-testid="job-1" to="/Messages/123" className="link">
              Messaging
            </Link>
          </Grid>
        </>
      )}
      {userData && userData.isAdmin && (
        <Grid item>
          <Link data-testid="job-1" to="/Admin" className="link">
            {t("Admin")}
          </Link>
        </Grid>
      )}

      {!userData ? (
        <>
          <Grid item>
            <Link data-testid="login-1" to="/UserLogin" className="link">
              {t("LoginText")}
            </Link>
          </Grid>
          <Grid item>
            <Link data-testid="signup-1" to="/Signup" className="link">
              {t("SignUpText")}
            </Link>
          </Grid>
        </>
      ) : (
        <Grid item>
          <Link to="/" className="link" onClick={signout}>
            {t("SignoutText")}
          </Link>
        </Grid>
      )}
      <Grid item>
        {i18n.language !== "en" ? (
          <Button
            color="inherit"
            onClick={() => changeLanguage("en")}
            className="link-button"
          >
            EN
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={() => changeLanguage("fr")}
            className="link-button"
          >
            FR
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default NavLinks;
