import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#fefefe",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#2B7AE4",
    textTransform: "capitalize",
  },
}));

export default function WelcomeNavbar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WorkFluxe
          </Typography>
          <Button
            color="primary"
            onClick={() => {
              props.history.push("/user/login");
            }}
          >
            Login
          </Button>
          <Button
            color="primary"
            onClick={() => {
              props.history.push("/user/register");
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
