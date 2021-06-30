import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ToFromForm() {
  return (
    <div>
      <Form.Row>
        <Col sm={12} md={7} lg={7}>
          <Form.Label className="boldLabel">TO:</Form.Label>
          <Form.Control plaintext readOnly placeholder="Joe Smith" />
          <Form.Control plaintext readOnly placeholder="Amz Consulting" />
          <Form.Control
            plaintext
            readOnly
            as="textarea"
            style={{ resize: "none" }}
            placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
          />
          <Form.Control plaintext readOnly placeholder="example@example.com" />
          <Form.Control plaintext readOnly placeholder="(229) 555-0109" />
          <Button color="primary" style={{}}>
            + Tax ID Number
          </Button>
          <br />
          <Button color="primary">+ Add Recipient</Button>
          <br />
          <Row className="ml-0">
            <FormControlLabel
              className="checkboxLabel"
              control={<Checkbox name="checkedA" color="primary" />}
              label="Offer Expires"
            />
            <Form.Control type="text" className="borderInput mr-2" />
            <Button
              variant="outlined"
              endIcon={<ExpandMoreIcon />}
              style={{ height: "39px" }}
            >
              Days
            </Button>
          </Row>
        </Col>
        <Col>
          <Form.Label className="boldLabel">FROM:</Form.Label>

          <Form.Control plaintext readOnly placeholder="Zul Q." />
          <Form.Control plaintext readOnly placeholder="WorkFluxe" />
          <Form.Control
            plaintext
            readOnly
            as="textarea"
            style={{ resize: "none" }}
            placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
          />
          <Form.Control plaintext readOnly placeholder="example@example.com" />
          <Form.Control plaintext readOnly placeholder="(480) 555-0103" />
        </Col>
      </Form.Row>
    </div>
  );
}
