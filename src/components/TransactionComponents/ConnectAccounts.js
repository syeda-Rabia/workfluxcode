import { makeStyles, Button } from "@material-ui/core";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import GridItem from "components/Grid/GridItem";
import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
const useStyles = makeStyles(styles);

export default function ConnectAccounts() {
  const classes = useStyles();

  return (
    <div>
      <GridItem xs={12} sm={6} md={7}>
        <div className="connectAccount--content">
          <span className="title">Connect a credit card or bank account.</span>
          <Button
            style={{
              whiteSpace: "nowrap",
            }}
            classes={{
              root: classes.themeBlue,
              label: classes.whiteLabelColor,
            }}
          >
            Connect Account
          </Button>
        </div>
      </GridItem>
    </div>
  );
}
