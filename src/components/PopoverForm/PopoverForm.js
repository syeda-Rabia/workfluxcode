import { Popover, Button, makeStyles } from "@material-ui/core";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import styles from "assets/jss/material-dashboard-react/views/genericStyles";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

export default function PopoverForm({ buttonText, formContent }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        endIcon={<AddCircleOutlineOutlinedIcon />}
        classes={{ root: classes.themeBlue }}
        onClick={handleClick}
        className="float-right"
      >
        {buttonText}
      </Button>
      <Popover
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
        <form className="p-3">{formContent}</form>
      </Popover>
    </>
  );
}
PopoverForm.propTypes = {
  buttonText: PropTypes.string,
  formContent: PropTypes.object,
};
