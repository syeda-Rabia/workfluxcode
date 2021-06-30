import { IconButton } from "@material-ui/core";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import { connect } from "react-redux";
import "./projectHeader.css";

var blueColor = "#2B7AE4";
var grayColor = "#ABABAB";

function ProjectHeader(props) {
  console.log({ props });
  // destructringn object
  const {
    handleChange,
    location: {
      state: { projectName },
    },
    // location: {
    //   state: {
    //     client: { name: clientName },
    //   },
    // },
  } = props;
  return (
    <div className="mb-2">
      <GridItem xs={12} sm={12} md={12}>
        <div className="d-flex project--title">
          <h1 style={{ color: grayColor }}>Project:&nbsp;</h1>
          <h1 className="" style={{ color: blueColor }}>
            {projectName}
          </h1>
          <IconButton
            onClick={(event) => {
              handleChange(event, 0);
            }}
            style={{ color: blueColor }}
          >
            <PeopleOutlineIcon />
          </IconButton>
          {props.userType === "owner" || props.userType === "collaborator" ? (
            <IconButton
              onClick={(event) => {
                handleChange(event, 1);
              }}
              style={{ color: blueColor }}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          ) : null}
        </div>
        <p style={{ color: grayColor }}>
          Client:{" "}
          <span style={{ color: "#000" }}>
            {/* {props.location.state.client?.username} */}
            {props.location.state.client.first_name !== undefined
              ? `${props.location.state.client.first_name} ${
                  props.location.state.client.last_name || ""
                }`
              : props.location.state.client.username}
          </span>
        </p>
      </GridItem>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(ProjectHeader);
