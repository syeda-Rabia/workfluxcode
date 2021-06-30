import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
  blackColor,
  grayTextColor,
} from "assets/jss/material-dashboard-react.js";
import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";

const genericStyles = (theme) => ({
  ...dropdownStyle(theme),
  themeBlue: {
    backgroundColor: "#2B7AE4",
    color: whiteColor,
    textTransform: "none",
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

    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "18px",
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
});

export default genericStyles;
