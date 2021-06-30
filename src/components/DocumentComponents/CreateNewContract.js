import {
  makeStyles,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import ToFromForm from "./ToFromForm";
import OverviewForm from "./OverviewForm";
import PricingFormTable from "./PricingFormTable";

const useStyles = makeStyles(styles);

export default function CreateNewContract() {
  const classes = useStyles();

  return (
    <Col ms={12} md={9} lg={9} className="createNewContract">
      <h1 className="createNewContract--heading">Create a New Contract</h1>

      <Form className="p-5" id="form">
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            PROJECT:
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>

        <ToFromForm />

        <Divider />

        <h6>Overview</h6>
        <OverviewForm />

        <Divider />
        <h6>Pricing</h6>
        <PricingFormTable />
        <br />
        <Form.Row>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Upfront Deposit Amount"
          />
          <Form.Control className="borderInput" type="text" />
        </Form.Row>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Billing Schedule
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Invoice Due after
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Late Fee
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Contract Completion
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
          <Form.Text muted className="ml-3">
            If either party ends the contract after approval and before
            completion, the Client will pay:
          </Form.Text>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Charge Selection
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            Country
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2" className="overviewLabel">
            State
          </Form.Label>
          <Col sm="10">
            <Form.Control className="borderInput" type="text" />
          </Col>
        </Form.Group>
        <div>
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
    </Col>
  );
}
