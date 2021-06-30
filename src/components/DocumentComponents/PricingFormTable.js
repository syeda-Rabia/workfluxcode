import React from "react";
import { Button } from "@material-ui/core";
import { Form, Table } from "react-bootstrap";
export default function PricingFormTable() {
  return (
    <div>
      <Table responsive borderless className="pricingtable">
        <thead>
          <tr>
            <th>SERVICES</th>
            <th>RATE</th>
            <th>UNITS</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Research, design, etc.</td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
          </tr>
          <tr>
            <td>Research, design, etc.</td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
            <td>
              <Form.Control className="borderInput" type="text" />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button color="primary"> + Add Line Item </Button>
    </div>
  );
}
