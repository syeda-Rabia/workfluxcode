import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

// core components
import { Table } from "react-bootstrap";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import { Button, Popover } from "@material-ui/core";
import "./invoice.css";

const useStyles = makeStyles(styles);

export default function Invoices() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="invoiceButtons">
        <Button
          endIcon={<ExpandMoreOutlinedIcon />}
          className="invoiceButton"
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          All Invoices
        </Button>

        <Button
          className="invoiceButton"
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Clients
        </Button>
        <Button
          className="invoiceButton"
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Projects
        </Button>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleClick}
          aria-describedby={id}
          variant="contained"
          className="float-right invoiceButton"
          classes={{ root: classes.themeBlue, label: classes.whiteLabelColor }}
        >
          New Invoice
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <form className="p-3">
            <div className="form-group">
              <label>Client</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Project</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Invoice Type</label>
              <input type="text" className="form-control" />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                className="float-right taskButtons--button4"
                classes={{ root: classes.themeBlue }}
              >
                <span className="d-flex " style={{ color: "#fff" }}>
                  Create
                  <div className="ml-2">
                    <AddCircleOutlineOutlinedIcon />
                  </div>
                </span>
              </Button>
            </div>
          </form>
        </Popover>
      </div>

      <div>
        <Card>
          <Table responsive borderless>
            <thead>
              <tr
                style={{
                  backgroundColor: "#FAFBFD",
                  borderBottom: "1px solid #EFEFEF",
                }}
              >
                <th className={classes.trColor} scope="col">
                  Issued Date
                </th>
                <th className={classes.trColor} scope="col">
                  Due Date
                </th>
                <th className={classes.trColor} scope="col">
                  Invoice#
                </th>
                <th className={classes.trColor} scope="col">
                  Type
                </th>
                <th className={classes.trColor} scope="col">
                  Client
                </th>
                <th className={classes.trColor} scope="col">
                  Project
                </th>
                <th className={classes.trColor} scope="col">
                  Invoice Amount
                </th>
                <th className={classes.trColor} scope="col">
                  Paid Amount
                </th>
                <th className={classes.trColor} scope="col">
                  Outstanding Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feb 23, 2020</td>
                <td>Feb 23, 2020</td>
                <td>23</td>
                <td>Monthly</td>
                <td>TED</td>

                <th>XYZ</th>
                <td>$1000</td>
                <td>$1000</td>
                <td>$1000</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  );
}
