import React from "react";
import Card from "components/Card/Card.js";
import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import { makeStyles, Button, Popover } from "@material-ui/core";

import { Table } from "react-bootstrap";

import "./document.scss";

// Icons
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const useStyles = makeStyles(styles);

export default function Document() {
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
    <div className="document__content">
      <div className="document__content--buttons">
        <Button
          className="mr-2"
          endIcon={<ExpandMoreOutlinedIcon />}
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          All Documents
        </Button>

        <Button
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Statuses
        </Button>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleClick}
          aria-describedby={id}
          variant="contained"
          className="float-right"
          classes={{ root: classes.themeBlue, label: classes.whiteLabelColor }}
        >
          New Document
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
              <label>Type</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Client</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Project</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Template</label>
              <input type="text" className="form-control" />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                endIcon={<AddCircleOutlineOutlinedIcon />}
                variant="contained"
                className="float-right"
                classes={{
                  root: classes.themeBlue,
                  label: classes.whiteLabelColor,
                }}
              >
                Create
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
                  Type
                </th>
                <th className={classes.trColor} scope="col">
                  Title
                </th>
                <th className={classes.trColor} scope="col">
                  Client
                </th>
                <th className={classes.trColor} scope="col">
                  Projects
                </th>
                <th className={classes.trColor} scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Purposal</td>
                <td>Management Consulting Proposal</td>
                <td>Ama</td>
                <td>AMZ Consulting</td>

                <td>
                  <span style={{ color: "#FFB340" }}>
                    <b> Complete</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="pagination mb-3">
            <Button>Prev</Button>
            <Button
              classes={{
                root: classes.themeBlue,
                label: classes.whiteLabelColor,
              }}
            >
              1
            </Button>
            <Button>2</Button>
            <Button>Next</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
