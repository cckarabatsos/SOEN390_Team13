import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/pages/SearchPage.css";
import CompanySearch from "./CompanySearch";
import JobSearch from "./JobSearch";
import UserNetworking from "./UserSearch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchPage() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  //palette used: companies: 006AF9, users: 5319FB , jobs: 9C27B0
  const [color, setColor] = useState("#006AF9");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setColor("#006AF9");
        break;
      case 1:
        setColor("#5319FB");
        break;
      case 2:
        setColor("#8f8aff");
        break;
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="tabsContainer">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, color: color }}>
            <Tabs
              value={value}
              onChange={handleChange}
              ria-label="basic tabs example"
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: color,
                  height: 4,
                },
              }}
            >
              <Tab
                label={<span className="tabsLabel">{t("CompanyTab")}</span>}
                {...a11yProps(0)}
              />
              <Tab
                label={<span className="tabsLabel">{t("UserTab")}</span>}
                {...a11yProps(1)}
              />
              <Tab
                label={<span className="tabsLabel">{t("JobTab")}</span>}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <hr className="tabsSeparator"></hr>
          <TabPanel value={value} index={0}>
            <CompanySearch />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserNetworking />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <JobSearch />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
