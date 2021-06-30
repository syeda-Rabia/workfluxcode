import React from "react";
import { Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { IconButton, makeStyles } from "@material-ui/core";
import SettingMenu from "components/SettingMenu/SettingMenu";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles(styles);

export default function RevenueAndExpenseTable() {
  const classes = useStyles();

  return (
    <div className="revenueAndExpense__content--table mt-3">
      <Table responsive borderless>
        <thead>
          <tr
            style={{
              backgroundColor:
                "rgb(" + 220 + "," + 220 + "," + 220 + "," + 0.5 + ")",
            }}
          >
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
              Project
            </th>
            <th className={classes.trColor} scope="col">
              Date
            </th>
            <th className={classes.trColor} scope="col">
              Amount
            </th>
            <th className={classes.trColor} scope="col">
              Recurring
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <FiberManualRecordIcon
                  style={{
                    color: "#DA0000",
                    marginRight: "5px",
                    fontSize: "16px",
                  }}
                />
                Ads
              </div>
            </td>
            <td>Advertising</td>
            <td>Business</td>
            <td>AMZ Consulting</td>
            <td>May 20, 2020</td>
            <td>$200</td>
            <td>Monthly</td>
            <td>
              <SettingMenu />
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <FiberManualRecordIcon
                  style={{
                    color: "#30C788",
                    marginRight: "5px",
                    fontSize: "16px",
                  }}
                />
                Invoice
              </div>
            </td>
            <td>Advertising</td>
            <td>Business</td>
            <td>AMZ Consulting</td>
            <td>May 20, 2020</td>
            <td>$200</td>
            <td>Monthly</td>
            <td>
              <SettingMenu />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
