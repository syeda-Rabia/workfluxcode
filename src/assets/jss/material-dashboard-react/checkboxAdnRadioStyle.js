import {
  primaryColor,
  blackColor,
  hexToRgb,
  transition,
} from "assets/jss/material-dashboard-react.js";

const checkboxAdnRadioStyle = {
  root: {
    padding: "13px",
    "&:hover": {
      backgroundColor: "unset !important",
    },
  },
  labelRoot: {
    marginLeft: "-14px",
  },
  checked: {
    opacity: 1,

    color: "#2B7AE4 !important",
    ...transition,
  },
  checkedIcon: {
    width: "17px",
    height: "16px",
    border: "2px solid #2B7AE4",
    borderRadius: "5px",
  },
  uncheckedIcon: {
    width: "17px",
    height: "16px",
    padding: "5px",
    border: "2px solid #9D9D9D",
    borderRadius: "5px",
  },
  radio: {
    color: primaryColor[0] + "!important",
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor[0],
    borderRadius: "50%",
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "50%",
  },
};

export default checkboxAdnRadioStyle;
