import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import face from "assets/img/faces/marc.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { logout } from "services/firebase-signin";
import { connect } from "react-redux";
import { Modal } from "antd";
import * as actionCreators from "store/actions";
import "./logout.scss";

function Logout(props) {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmLogout = () => {
    handleClose();
    Modal.confirm({
      title: "Logout?",
      content: "Do you want to logout?",
      okText: "Logout",
      centered: true,
      cancelText: "Cancel",
      destroyOnClose: true,
      okButtonProps: {
        className: "rounded-pill",
      },
      cancelButtonProps: { className: "rounded-pill" },
      maskStyle: {
        backgroundColor: "rgba(251, 251, 251, 0.8)",
      },
      onOk: onLogout,
    });
  };

  const onLogout = async () => {
    if (props.platform === "google.com") {
      let res = await logout();
      if (res.hasOwnProperty("success")) {
        props.onUserLogout();
      }
    } else {
      props.onUserLogout();
    }

    handleClose();
  };
  console.log(props, "logout");
  return (
    <div>
      <div className="userAvatar">
        <Avatar alt="user" src={props.pic} />
        <div className=" position-relative">
          <p className="userName">
            {(props.user.first_name || "") + (props.user.last_name || "") ||
              props.user.username}
          </p>
          <IconButton
            className="p-1 float-right expandMoreIcon"
            onClick={handleClick}
          >
            <ExpandMoreIcon />
          </IconButton>
          <p className="email">{props.email}</p>
        </div>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            history.push("/app/setting");
            handleClose();
          }}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={confirmLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.Login.user_info,
    email: state.Login.user_info.email,
    pic: state.Login.picture,
    platform: state.Login.platform,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogout: () => dispatch(actionCreators.logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
