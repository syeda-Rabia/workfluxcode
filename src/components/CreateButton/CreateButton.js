/* eslint-disable react/jsx-key */
import "antd/dist/antd.css";
import "./CreateButton.css";
import React from "react";
import { Keyframes, animated } from "react-spring/renderprops";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { Button, IconButton, Divider } from "@material-ui/core";
import { Row } from "react-bootstrap";

// const classes = useStyles();

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [
    { x: 0, from: { x: -100 }, delay: 500 },
    { x: -100, delay: 800 },
  ],
  // single items,
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async (call) => {
    // await delay(400);
    await call({ delay: 0, x: -100 });
  },
});

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [
    { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
    { x: -100, opacity: 0, delay: 0 },
  ],
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
});

export default class CreateButton extends React.Component {
  state = { open: false };
  toggle = () => this.setState((state) => ({ open: !state.open }));
  render() {
    const headingStyle = {
      marginBottom: "1px",
      fontSize: "12px",
      fontWeight: "400",
      textTransform: "uppercase",
      color: "#aaa",
    };
    const spanStyle = {
      marginBottom: "1px",
      fontSize: "14px",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#2B7AE4",
    };
    const state =
      this.state.open === undefined
        ? "peek"
        : this.state.open
        ? "open"
        : "close";
    const items = [
      <div className="my-2">
        <h3
          className="w-100 my-2 p-2 d-flex  align-items-center justify-content-between"
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "25px",
            lineHeight: "31px",
            color: "#292929",
          }}
        >
          Menu
          <IconButton className="float-right p-1" onClick={this.toggle}>
            <CloseIcon style={{ fontSize: "20px", fill: "#DA0000" }} />
          </IconButton>
        </h3>
        <Divider />
      </div>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Client</div>
          <span style={spanStyle}>Add Client</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Project</div>
          <span style={spanStyle}>Add Project</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Form</div>
          <span style={spanStyle}>New Form</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Proposal</div>
          <span style={spanStyle}>New Proposal</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Contract</div>
          <span style={spanStyle}>New Contract</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
      <Row className=" justify-content-between align-items-center mx-2 my-3">
        <div className="p1-2">
          <div style={headingStyle}>Invoice</div>
          <span style={spanStyle}>New Invoice</span>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            style={{ minWidth: "25px", width: "30px", minHeight: "25px" }}
          >
            <AddIcon />
          </Button>
        </div>
      </Row>,
    ];

    return (
      <>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          variant="contained"
          onClick={this.toggle}
          color="primary"
          // className={classes.themeBlue}
        >
          Create
        </Button>
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              className="sidebar"
              style={{
                transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
              }}
            >
              <Content
                native
                items={items}
                keys={items.map((_, i) => i)}
                reverse={!this.state.open}
                state={state}
              >
                {(item) => ({ x, ...props }) => (
                  <animated.div
                    style={{
                      transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
                      ...props,
                    }}
                  >
                    {item}
                  </animated.div>
                )}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </>
    );
  }
}
