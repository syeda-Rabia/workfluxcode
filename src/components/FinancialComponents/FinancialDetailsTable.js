import React from "react";
import { Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(styles);

export default function FinancialDetailsTable() {
  const classes = useStyles();

  return (
    <div className="financials__content--table">
      <Table responsive borderless>
        <thead>
          <tr>
            <th className={classes.trColor} scope="col"></th>
            <th className={classes.trColor} scope="col">
              Jan
            </th>
            <th className={classes.trColor} scope="col">
              Feb
            </th>
            <th className={classes.trColor} scope="col">
              Mar
            </th>
            <th className={classes.trColor} scope="col">
              Apr
            </th>
            <th className={classes.trColor} scope="col">
              May
            </th>
            <th className={classes.trColor} scope="col">
              June
            </th>
            {/* <th className={classes.trColor} scope="col">Jul</th>
            <th className={classes.trColor} scope="col">Aug</th>
            <th className={classes.trColor} scope="col">Sep</th>
            <th className={classes.trColor} scope="col">Oct</th>
            <th className={classes.trColor} scope="col">Nov</th>
            <th className={classes.trColor} scope="col">Dec</th> */}
            <th
              style={{
                color: "#2B7AE4",
              }}
              scope="col"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className={classes.trColor}>
              Income
            </th>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td className="tdTotal">$1.500</td>
          </tr>
          <tr>
            <th scope="row" className={classes.trColor}>
              Expenses
            </th>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td className="tdTotal">$1.500</td>
          </tr>
          <tr>
            <th scope="row" className={classes.trColor}>
              Profit
            </th>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td className="tdTotal">$1.500</td>
          </tr>
          <tr>
            <th scope="row" className={classes.trColor}>
              Profit Margin
            </th>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td>$1.500</td>
            <td className="tdTotal">$1.500</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
