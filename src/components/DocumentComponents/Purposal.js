import { Button, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { Col, Form } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import ToFromForm from "./ToFromForm";
import PricingFormTable from "./PricingFormTable";
import AboutUs from "./AboutUs";

const useStyles = makeStyles(styles);
export default function Purposal() {
  const classes = useStyles();

  return (
    <Col sm={12} md={9} lg={9} className="purposal">
      <div className="d-flex flex-row justify-content-end">
        <Button
          className="mr-auto"
          classes={{
            root: classes.themeBlue,
          }}
        >
          Send
        </Button>
        <Button variant="outlined" className="mr-2">
          Preview
        </Button>
        <Button variant="outlined" className="">
          Actions
        </Button>
      </div>

      <div className="purposal--div">
        <div className="d-flex flex-row div--header">
          <div className="addlogoImg">
            <span className="text">Add Logo/Image</span>
          </div>
          <div className="header--heading">
            <h1>AMZ Invoice</h1>

            <span>AMZ Growth Consulting</span>
          </div>
        </div>
        <Form className="mt-3" id="form">
          <ToFromForm />
          <Divider />
          <h6>Pricing</h6>
          <PricingFormTable />
          <Divider />
          <h6>About Us</h6>

          <AboutUs />
          <Divider />
          <div className="mt-5">
            <Button
              variant="contained"
              className="m-2"
              classes={{
                root: classes.themeBlue,
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              className="m-2"
              classes={{
                root: classes.themeBlue,
              }}
            >
              Save as Template
            </Button>
            <Button
              variant="contained"
              className="m-2"
              classes={{
                root: classes.themeBlue,
              }}
            >
              Send
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
}
