import React from "react";
import style from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles } from "@material-ui/core";
import { Table } from "react-bootstrap";
const useStyles = makeStyles(style);

export default function InvoiceOverView() {
  const classes = useStyles();

  return (
    <div className="invoiceOverView__content ">
      <h6 className="invoiceOverView__content--heading">INVOICES OVERVIEW</h6>
      <Table
        responsive
        borderless
        className="invoiceOverView__content--table table-sm"
      >
        <thead>
          <tr>
            <th scope="col">Outstanding</th>
            <th scope="col">Overdue</th>
            <th scope="col">Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$2.000</td>
            <td style={{ color: "#DA0000", fontWeight: "600" }}>$739.65</td>
            <td>$778.35</td>
          </tr>
          <tr>
            <td>$2.000</td>
            <td style={{ color: "#DA0000", fontWeight: "600" }}>$739.65</td>
            <td>$778.35</td>
          </tr>
          <tr>
            <td>$2.000</td>
            <td style={{ color: "#DA0000", fontWeight: "600" }}>$739.65</td>
            <td>$778.35</td>
          </tr>
        </tbody>
      </Table>
      <h6 className="invoiceOverView__content--heading">PROJECTS</h6>
      <div className="d-flex flex-column">
        <span className="invoiceOverView__content--projects">
          AMZ Consulting
        </span>
        <span className="invoiceOverView__content--projects">
          SFT Consulting
        </span>
      </div>

      <h6 className="invoiceOverView__content--heading mt-4">NOTES</h6>
      <p className="invoiceOverView__content--notes">
        I've been working with this client for the past 3 months for consulting
        services. It seems we'll continue to work together.
      </p>
    </div>
  );
}
