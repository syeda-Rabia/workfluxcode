import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
  blackColor,
  grayTextColor,
  dangerColor,
} from "assets/jss/material-dashboard-react.js";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.js";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
const projectStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  themeBlue: {
    backgroundColor: "#2B7AE4",
    textTransform: "none",
    color: whiteColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb("#2B7AE4") +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb("#2B7AE4") +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: "#2B7AE4",
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb("#2B7AE4") +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb("#2B7AE4") +
        ",.2)",
    },
  },
  labelColor: { color: grayTextColor },
  whiteLabelColor: { color: whiteColor },
  trColor: {
    color: "#696969",

    whiteSpace: "nowrap",
  },
  CheckboxLabel: {
    fontWeight: "normal",
    fontSize: "12px ",
    color: "#292929",
    whiteSpace: "break-spaces",
  },
  cardTitleGray: {
    color: grayTextColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleBlack: {
    color: blackColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  ...tooltipStyle,

  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle",
  },

  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0",
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px",
  },

  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none",
  },
};

export default projectStyle;
