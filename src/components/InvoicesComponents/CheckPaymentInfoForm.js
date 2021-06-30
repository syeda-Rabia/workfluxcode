import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import GridItem from "components/Grid/GridItem";
import "./payments.scss";
const useStyles = makeStyles(styles);

export default function CheckPaymentInfoForm() {
  var blueColor = "#0077ff";

  const classes = useStyles();

  return (
    <div>
      <div style={{ margin: "0px -20px" }}>
        <GridItem xs={12} sm={6} md={7}>
          <Card plain style={{ backgroundColor: "rgba(250,251,253,255)" }}>
            <CardHeader className="payment__content--checkPaymentInfo">
              <h4 style={{ textTransform: "uppercase", color: "#616162" }}>
                Check Payment Information
              </h4>
            </CardHeader>
            <CardBody>
              <form>
                <div className="form-group">
                  <span className="inputLabel">Address</span>
                  <input type="select" className="form-control" />
                </div>
                <div className="form-group">
                  <span className="inputLabel">Instructions</span>
                  <input type="text" className="form-control" />
                </div>
                <FormControlLabel
                  value="end"
                  className="checkboxLabel"
                  control={<Checkbox style={{ color: blueColor }} />}
                  label="I gave permission to Workfluxe to display this account information to my clients."
                  labelPlacement="end"
                />
                <Button
                  className="mt-3"
                  variant="contained"
                  classes={{
                    root: classes.themeBlue,
                    label: classes.whiteLabelColor,
                  }}
                >
                  Save Payment Info
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </div>
    </div>
  );
}
