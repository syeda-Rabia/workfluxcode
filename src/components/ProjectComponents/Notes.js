import React from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import styles from "assets/jss/material-dashboard-react/views/projectStyle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#484848",
    backgroundColor: "#FAFBFD",
    border: "1px solid #EFEFEF",
    boxSizing: "border-box",
    borderRadius: "7px",
  },
  inline: {
    display: "inline",
  },
  labelBtn: styles.labelColor,
  reset: {
    margin: 0,
    padding: 0,
  },
}));

export default function Notes() {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Nisi, at fermentum est dolor non, turpis enim, consectetur tincidunt. In sit dictumst ullamcorper est vitae. Venenatis." />
          <SettingsIcon />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemText primary="Nisi, at fermentum est dolor non, turpis enim, consectetur tincidunt. In sit dictumst ullamcorper est vitae. Venenatis." />
          <SettingsIcon />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemText primary="Nisi, at fermentum est dolor non, turpis enim, consectetur tincidunt. In sit dictumst ullamcorper est vitae. Venenatis." />
          <SettingsIcon />
        </ListItem>
      </List>
    </div>
  );
}
