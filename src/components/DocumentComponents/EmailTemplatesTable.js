import Card from "components/Card/Card";
import React from "react";
import { Table } from "react-bootstrap";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useHistory } from "react-router-dom";

import "./documentComponents.scss";
const useStyles = makeStyles(styles);

export default function EmailTemplatesTable() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <>
      <Button variant="outlined" className={classes.labelColor}>
        Signature
      </Button>
      <Button
        endIcon={<AddCircleOutlineOutlinedIcon />}
        variant="contained"
        className="float-right"
        classes={{ root: classes.themeBlue, label: classes.whiteLabelColor }}
        onClick={() => {
          history.push("/app/template");
        }}
      >
        New Document
      </Button>
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
                Template Name
              </th>
              <th className={classes.trColor} scope="col">
                Email Subject
              </th>

              <th className={classes.trColor} scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Purposal</td>
              <td>
                <span style={{ color: "#A9A9A9" }}>&nbsp;[Client Name]</span>,
                just a few questions before we start our prject,
                <span style={{ color: "#A9A9A9" }}>&nbsp;[Project Name]</span>
              </td>

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
              <td>
                Welcome Abord
                <span style={{ color: "#A9A9A9" }}>&nbsp;[Client Name]</span>
              </td>

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
              <td>
                Contract -{" "}
                <span style={{ color: "#A9A9A9" }}>&nbsp;[Project Name]</span>,
                <span style={{ color: "#A9A9A9" }}>&nbsp;[Client-Name]</span>
              </td>

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
    </>
  );
}
