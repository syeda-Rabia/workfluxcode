import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

export default function SettingMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        style={{
          padding: "3px",
        }}
        onClick={handleClick}
      >
        <SettingsOutlinedIcon style={{ fill: "#DADADA" }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>View More</MenuItem>
        <MenuItem onClick={handleClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleClose}>Archive</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}
