import React from "react";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "../settingComponents.scss";

const useStyles = makeStyles(styles);

export default function SubscriptionCard() {
  const classes = useStyles();

  return (
    <div>
      <div className="settingComponents--subscriptionCard">
        <h6 className="title">Plan 1</h6>
        <ul>
          <li>Quam euismod id.</li>
          <li>Quam euismod id.</li>
          <li>Quam euismod id.</li>
          <li>Quam euismod id.</li>
          <li>Quam euismod id.</li>
          <li>Quam euismod id.</li>
        </ul>
        <Button
          variant="contained"
          className="ml-3 px-5"
          classes={{
            root: classes.themeBlue,
            label: classes.whiteLabelColor,
          }}
        >
          Select
        </Button>
      </div>
    </div>
  );
}
