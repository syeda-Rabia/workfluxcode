import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import { Button, makeStyles } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import "./setting.scss";
const useStyles = makeStyles(styles);

export default function Settings() {
  const classes = useStyles();

  return (
    <div className="col-md-7 col-sm-12 invoiceSetting__content">
      <h4 style={{ textTransform: "uppercase", color: "#616162" }}>
        Invoice settings
      </h4>
      <form className="invoiceSetting__content--form">
        <div className="form-group">
          <h6> Default Due Date </h6>
          <div className="row">
            <label className="col-sm-6  col-form-label col-form-label-sm">
              The number of days after the invoice is issued before it becomes
              overdue
            </label>
            <div className="col-sm-6">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <h6> Default Late Fee (%) </h6>
          <div className="row">
            <label className="col-sm-6  col-form-label col-form-label-sm">
              Late fee wil be added one day after the due date. Then it will be
              added every month.
            </label>
            <div className="col-sm-6">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3">
            <h6> Default Note</h6>
            <textarea
              className="form-control"
              placeholder="Required example textarea"
              required
              defaultValue={""}
            />
          </div>
        </div>
        <div className="form-group">
          <h6>Val / tax id number</h6>
          <div className="row">
            <label className="col-sm-6 col-form-label col-form-label-sm">
              Set Your defaut value to appear on invoices
            </label>
            <div className="col-sm-6">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          classes={{
            root: classes.themeBlue,
            label: classes.whiteLabelColor,
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
