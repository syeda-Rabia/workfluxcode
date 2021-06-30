import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// nodejs library that concatenates classes
import classNames from "classnames";
const styles = {
  grid: {
    margin: "15px -19px  !important",

    marginRight: "-10px  !important",
    width: "unset",
  },
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { className, children, ...rest } = props;

  const gridClasses = classNames({
    [classes.grid]: true,

    [className]: className !== undefined,
  });

  return (
    <Grid container {...rest} className={gridClasses}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
