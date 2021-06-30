import React from "react";
import { Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(styles);

export default function IncomeTable() {
  const classes = useStyles();

  return (
    <div className="financials__content--table">
      <Table responsive borderless>
        <thead>
          <tr>
            <th className={classes.trColor} scope="col">
              Name
            </th>
            <th className={classes.trColor} scope="col">
              Category
            </th>
            <th className={classes.trColor} scope="col">
              Type
            </th>
            <th className={classes.trColor} scope="col">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ads</td>
            <td>Advertising</td>
            <td>Business</td>
            <td>$1.500</td>
          </tr>
          <tr>
            <td>Ads</td>
            <td>Advertising</td>
            <td>Business</td>
            <td>$1.500</td>
          </tr>
          <tr>
            <td>Ads</td>
            <td>Advertising</td>
            <td>Business</td>
            <td>$1.500</td>
          </tr>
          <tr>
            <td>Ads</td>
            <td>Advertising</td>
            <td>Business</td>
            <td>$1.500</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
