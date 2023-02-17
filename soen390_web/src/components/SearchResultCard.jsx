import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "2%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginRight: theme.spacing(2),
    borderRadius: "50%",
    border: "2px solid white",
  },
  connectButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  viewProfileButton: {
    marginTop: theme.spacing(2),
  },
}));

const SearchResultCard = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Profile Picture"
              src={data.imageUrl}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Work Position: ${data.workPosition}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Address: ${data.address}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Connections (like LinkedIn): ${data.connections}`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.connectButton}
            >
              Connect
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.viewProfileButton}
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

SearchResultCard.defaultProps = {
  data: {
    imageUrl: "",
    name: "",
    workPosition: "",
    address: "",
    connections: "",
  },
};

export default SearchResultCard;
