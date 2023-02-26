import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { grey, purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    backgroundColor: grey[200],
    borderRadius: 25,
    width: "40%",
    height: "3rem",
    paddingTop: "5px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  searchButton: {
    backgroundColor: purple[500],
    color: "black",
    "&:hover": {
      backgroundColor: purple[700],
    },
    textTransform: "none",
    borderRadius: 5,
    width: "40%",
    fontSize: "1rem",
  },
}));

function SearchBar(props, ref) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    props.onSearchBtnClick(searchText);
  };

  React.useImperativeHandle(ref, () => ({
    getInputValue: () => inputRef.current.value,
  }));

  return (
    <TextField
      className={classes.searchInput}
      placeholder="Search"
      variant="outlined"
      size="small"
      fullWidth
      inputRef={inputRef}
      value={searchText}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              className={classes.searchButton}
              variant="contained"
              size="small"
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </InputAdornment>
        ),
        style: { justifyContent: "center" },
      }}
    />
  );
}

const ForwardedSearchBar = React.forwardRef(SearchBar);

export default ForwardedSearchBar;
