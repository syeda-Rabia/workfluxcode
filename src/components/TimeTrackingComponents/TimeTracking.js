import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

// core components
import { Col, Table } from "react-bootstrap";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { emailsSubscriptionChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/projectStyle";
import { Button, Popover, RadioGroup, Radio } from "@material-ui/core";
import "./timeTracking.scss";

const useStyles = makeStyles(styles);
// const useStyles = makeStyles((theme) => ({
//   style: styles,
// }));

export default function TimeTracking() {
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
  //   const responsiveClasses = useResponsiveStyles();

  return (
    <>
      <div className="timeTrackingButtons">
        <Button
          endIcon={<ExpandMoreOutlinedIcon />}
          className="timeTrackingButton"
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          All Clients
        </Button>

        <Button
          className="timeTrackingButton"
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Projects
        </Button>
        <Button
          className="timeTrackingButton"
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          7 Days
        </Button>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleClick}
          aria-describedby={id}
          variant="contained"
          className="float-right timeTrackingButton"
          classes={{ root: classes.themeBlue, label: classes.whiteLabelColor }}
        >
          New Entry
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
              <label>Date</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Time</label>
              <div className="d-flex justify-content-between timeInput">
                <input
                  type="number"
                  min="1"
                  style={{ width: "60px" }}
                  className="form-control"
                />
                <input
                  type="number"
                  maxLength="2"
                  min="1"
                  max="60"
                  style={{ width: "60px" }}
                  className="form-control"
                />
                <input
                  type="number"
                  min="1"
                  max="60"
                  style={{ width: "60px" }}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Hourly Rate</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Task</label>
              <input type="text" className="form-control" />
            </div>
            <div>
              <RadioGroup>
                <FormControlLabel
                  value="Billed"
                  control={<Radio color="primary" />}
                  label="Billed"
                />
                <FormControlLabel
                  value="UnBilled"
                  control={<Radio color="primary" />}
                  label="UnBilled"
                />
              </RadioGroup>
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

      <GridContainer>
        <Col xs={12} sm={12} md={3}>
          <Card className="timeTrackingcard">
            <CardBody className="timeTrackingcard__content">
              <h4 className="timeTrackingcard__content--cardTitle">
                Billed Hours
              </h4>

              <div className="d-flex flex-row">
                <div
                  style={{
                    height: "40px",
                    paddingRight: "15px",

                    borderLeft: "5px solid #2B7AE4",
                  }}
                ></div>
                <span>02:00</span>
              </div>
              <p>$40000</p>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="timeTrackingcard">
            <CardBody className="timeTrackingcard__content">
              <h4 className="timeTrackingcard__content--cardTitle">
                UnBilled Hours
              </h4>

              <div className="d-flex flex-row">
                <div
                  style={{
                    height: "40px",
                    paddingRight: "15px",

                    borderLeft: "5px solid #FFB240",
                  }}
                ></div>
                <span>04:00</span>
              </div>
              <p>$40000</p>
            </CardBody>
          </Card>
        </Col>
      </GridContainer>
      <GridContainer>
        <Col xs={12} sm={12} md={12}>
          <Card chart>
            <CardBody>
              <div
                style={{
                  backgroundColor: "#FAFBFD",

                  borderRadius: "10px",
                }}
              >
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </GridContainer>
      <div className="timeTracking__table--buttons">
        <Button
          endIcon={<ExpandMoreOutlinedIcon />}
          className="taskButton"
          classes={{
            label: classes.labelColor,
          }}
          variant="outlined"
        >
          All Clients
        </Button>

        <Button
          className=""
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Projects
        </Button>
        <Button
          className=""
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          7 Days
        </Button>
        <Button
          className=""
          classes={{
            label: classes.labelColor,
          }}
          endIcon={<ExpandMoreOutlinedIcon />}
          variant="outlined"
        >
          All Hours
        </Button>
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
                  Time
                </th>
                <th className={classes.trColor} scope="col">
                  Date
                </th>
                <th className={classes.trColor} scope="col">
                  Billed
                </th>
                <th className={classes.trColor} scope="col">
                  Client
                </th>
                <th className={classes.trColor} scope="col">
                  Project
                </th>
                <th className={classes.trColor} scope="col">
                  Task
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "#2B7AE4" }}>02:00:00</td>
                <td>March 21, 2020</td>
                <td>
                  <span style={{ color: "#DA0000" }}>
                    <b> Unbilled</b>
                  </span>
                </td>
                <td>Amna</td>
                <td>Ama Consulting</td>

                <td>Marketing Research</td>
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
    </>
  );
}
