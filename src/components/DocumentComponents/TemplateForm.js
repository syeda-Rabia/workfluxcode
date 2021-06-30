import {
  makeStyles,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
  Button,
  Popover,
  RadioGroup,
  Radio,
  Grid,
} from "@material-ui/core";
import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { Form } from "react-bootstrap";
import GridContainer from "components/Grid/GridContainer";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
const useStyles = makeStyles(styles);

export default function TemplateForm() {
  const classes = useStyles();

  const [services, setServices] = React.useState([
    {
      name: "Branding",
      check: false,
    },
    {
      name: "Marketing",
      check: false,
    },
    {
      name: "Development",
      check: false,
    },
    {
      name: "Other",
      check: false,
    },
  ]);
  const [currentBudget, setCurrentBudget] = React.useState([
    {
      name: "$5,000 - $10,000",
      check: false,
    },
    {
      name: "$2,500 - $5,000",
      check: false,
    },
    {
      name: "$1,000 - $2,500",
      check: false,
    },
    {
      name: "Other",
      check: false,
    },
  ]);
  const [value, setValue] = React.useState("other");

  const [serviceanchorEl, setServiceAnchorEl] = React.useState(null);
  const [budgetanchorEl, setBudgetAnchorEl] = React.useState(null);
  const [addOption, setAddOption] = React.useState(null);
  const openAddServive = Boolean(serviceanchorEl);
  const openAddBudget = Boolean(budgetanchorEl);
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label className="labelHeading">
            Form Template Name
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Lead Capture Form (or select from existing Temaplte)"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading">
            Form Title{" "}
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control type="text" placeholder="Let’s Work Together!" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading">
            Form Text{" "}
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Please submit this form and we’ll get in touch soon."
          />
        </Form.Group>

        <Divider className="my-5" />

        <Form.Group>
          <Form.Label className="labelHeading blackColor">
            First Name
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading blackColor">
            Last Name
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading blackColor">
            Email Address
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading blackColor">
            What services are you interested in?
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <div className="d-flex flex-column">
            {services.map((pro, index) => (
              <FormControlLabel
                key={index}
                className="p-0 m-0"
                style={{ color: "#616162" }}
                control={
                  <Checkbox
                    className="p-1"
                    checked={pro.check}
                    onChange={() => {
                      let i = index;
                      let checkService = [...services];
                      checkService[i].check = !checkService[i].check;
                      setServices(checkService);
                    }}
                    style={{ color: "#2B7AE4" }}
                  />
                }
                label={pro.name}
              />
            ))}
          </div>
          <Button
            onClick={(event) => {
              setServiceAnchorEl(event.currentTarget);
            }}
            style={{ color: "#2B7AE4" }}
          >
            + Add Option
          </Button>
          <Popover
            open={openAddServive}
            anchorEl={serviceanchorEl}
            onClose={() => {
              setServiceAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Form.Group className="p-3">
              <Form.Label className="labelHeading blackColor">
                What services are you interested in?
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  setAddOption({ name: event.target.value, check: false });
                }}
              />
              <Button
                className="mt-3"
                variant="outlined"
                color="primary"
                style={{ color: "#2B7AE4" }}
                onClick={() => {
                  setServiceAnchorEl(null);
                  setServices([...services, addOption]);
                }}
              >
                Add
              </Button>
            </Form.Group>
          </Popover>
        </Form.Group>
        <Form.Group>
          <Form.Label className="labelHeading blackColor">
            What is your current budget?
            <IconButton
              className="float-right"
              style={{
                padding: "3px",
              }}
            >
              <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
            </IconButton>
          </Form.Label>
          <RadioGroup
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            {currentBudget.map((pro, index) => (
              <FormControlLabel
                key={index}
                value={pro.name}
                className="p-0 m-0"
                style={{ color: "#616162" }}
                control={
                  <Radio
                    className="p-1"
                    onChange={() => {
                      let i = index;
                      let checkCurrentBudget = [...currentBudget];
                      checkCurrentBudget[i].check = !checkCurrentBudget[i]
                        .check;
                      setCurrentBudget(checkCurrentBudget);
                    }}
                    style={{ color: "#2B7AE4" }}
                  />
                }
                label={pro.name}
              />
            ))}
          </RadioGroup>
          <Button
            onClick={(event) => {
              setBudgetAnchorEl(event.currentTarget);
            }}
            style={{ color: "#2B7AE4" }}
          >
            + Add Option
          </Button>
          <Popover
            open={openAddBudget}
            anchorEl={budgetanchorEl}
            onClose={() => {
              setBudgetAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Form.Group className="p-3">
              <Form.Label className="labelHeading blackColor">
                What is your current budget?
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => {
                  setAddOption({ name: event.target.value, check: false });
                }}
              />
              <Button
                className="mt-3"
                variant="outlined"
                color="primary"
                style={{ color: "#2B7AE4" }}
                onClick={() => {
                  setBudgetAnchorEl(null);
                  setCurrentBudget([...currentBudget, addOption]);
                }}
              >
                Add
              </Button>
            </Form.Group>
          </Popover>
        </Form.Group>
        <div>
          <Button
            variant="contained"
            className="m-2"
            classes={{
              root: classes.themeBlue,
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            className="m-2"
            classes={{
              root: classes.themeBlue,
            }}
          >
            Save as Template
          </Button>
          <Button
            variant="contained"
            className="m-2"
            classes={{
              root: classes.themeBlue,
            }}
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
}
