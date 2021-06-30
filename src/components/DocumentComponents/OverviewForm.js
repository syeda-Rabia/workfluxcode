import React from "react";
import { Form, Col, Row } from "react-bootstrap";

export default function OverviewForm() {
  return (
    <div>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" className="overviewLabel">
          Start Date
        </Form.Label>
        <Col sm="10">
          <Form.Control className="borderInput" type="text" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" className="overviewLabel">
          End Date
        </Form.Label>
        <Col sm="10">
          <Form.Control className="borderInput" type="text" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" className="overviewLabel">
          Total Duration
        </Form.Label>
        <Col sm="10">
          <Form.Control className="borderInput" type="text" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" className="overviewLabel">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            className="borderInput w-100"
            style={{ resize: "none" }}
            as="textarea"
            rows={3}
          />
        </Col>
      </Form.Group>
    </div>
  );
}
