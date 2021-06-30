import Card from "components/Card/Card";
import React from "react";
import { Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { IconButton, makeStyles } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import "./documentComponents.scss";
const useStyles = makeStyles(styles);

export default function DocumentTemplatesTable() {
  const classes = useStyles();

  return (
    <Card>
      <Table responsive borderless className="documents--TemplatesTable">
        <thead>
          <tr
            style={{
              backgroundColor: "#FAFBFD",
              borderBottom: "1px solid #EFEFEF",
            }}
          >
            <th className={classes.trColor} scope="col">
              Type
            </th>
            <th className={classes.trColor} scope="col">
              Title
            </th>
            <th className={classes.trColor} scope="col">
              Date
            </th>
            <th className={classes.trColor} scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Purposal</td>
            <td>Management Consulting Proposal</td>
            <td>12/10/13</td>

            <td>
              <IconButton
                style={{
                  padding: "3px",
                }}
              >
                <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td>Purposal</td>
            <td>Management Consulting Proposal</td>
            <td>12/10/13</td>

            <td>
              <IconButton
                style={{
                  padding: "3px",
                }}
              >
                <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td>Purposal</td>
            <td>Management Consulting Proposal</td>
            <td>12/10/13</td>

            <td>
              <IconButton
                style={{
                  padding: "3px",
                }}
              >
                <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}
