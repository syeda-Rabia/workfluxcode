import UsersTable from "components/UsersComponents/UsersTable";
import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import genericStyles from "assets/jss/material-dashboard-react/views/genericStyles";
import { useWindowEvent } from "utils/Functions";
import { connect } from "react-redux";
import Reorder from "components/Table/Reorder";
const useStyles = makeStyles(genericStyles);

function Users(props) {
  const classes = useStyles();
  // useWindowEvent("mousemove", (e) => console.log(e));
  return (
    <div className="">
      <h1
        className="my-4"
        style={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "25px",
          lineHeight: "31px",

          color: "#2B7AE4",
        }}
      >
        Users
      </h1>
      {/* <Reorder /> */}
      {props.userType === "owner" ? (
        <Button
          component={Link}
          to="/app/invite"
          style={{ wordWrap: "normal" }}
          endIcon={<AddCircleOutlineOutlinedIcon />}
          variant="contained"
          className="float-right"
          classes={{ root: classes.themeBlue, label: classes.whiteLabelColor }}
        >
          Invite People
        </Button>
      ) : null}

      <br />
      <br />
      <UsersTable />
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(Users);
