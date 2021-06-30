import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "0 15px !important",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      marginBottom: "10px",
      padding: "0 8px !important",
    },
    [theme.breakpoints.down("xm")]: {
      marginTop: "10px",
      marginBottom: "10px",
      padding: "0 5px !important",
    },
  },
}));

export default function GridItem(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
