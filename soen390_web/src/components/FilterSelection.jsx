import { Grid, Paper, Radio, RadioGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import React from "react";
import { useTranslation } from "react-i18next";
const FilterSelection = (props) => {
  const handleChange = (event) => {
    props.onRadioChange(event.target.value);
    
  };
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
            {t("SearchByText")}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={props.radioValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="name"
                control={<Radio />}
                label={t("NameText")}
              />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={t("ByEmailText")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterSelection;
