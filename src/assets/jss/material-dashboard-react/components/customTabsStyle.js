import { blackColor, blueColor } from "assets/jss/material-dashboard-react";
import { hexToRgb, whiteColor } from "assets/jss/material-dashboard-react.js";

const customTabsStyle = {
  cardTitle: {
    float: "left",
    padding: "10px 10px 10px 0px",
    lineHeight: "24px",
  },
  cardTitleRTL: {
    float: "right",
    padding: "10px 0px 10px 10px !important",
  },
  displayNone: {
    display: "none !important",
  },
  tabsRoot: {
    minHeight: "unset !important",
    overflowX: "visible",
    "& $tabRootButton": {
      fontSize: "0.875rem",
    },
    "& $tabRootButton:first-child": {
      display: "none",
    },
    "& $tabRootButton:nth-child(2)": {
      display: "none",
    },
  },
  verticalTabsRoot: {
    background: "#FAFBFD",
    borderRadius: "7px",
    padding: "9px",
    minHeight: "unset !important",
    overflowX: "visible",
    "& $tabRootButton": {
      fontSize: "0.875rem",
    },
  },
  tabRootButton: {
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "10px 15px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    color: "#7f7f7f" + " !important",

    marginLeft: "0px",
    "&:last-child": {
      marginLeft: "0px",
    },
    "&:first-child": {
      marginLeft: "0px",
    },
  },
  styleLesstabRootButton: {
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "27px !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "10px 15px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    color: "#7f7f7f" + " !important",
    borderRight: "2px solid #EEEEEE !important",
    marginLeft: "0px",
    "&:last-child": {
      marginLeft: "0px",
      borderRight: "none !important",
    },
    "&:first-child": {
      marginLeft: "0px",
    },
  },
  verticaltabRootButton: {
    justifyContent: "flex-start",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    // background: "yellow",
    height: "30px !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "5px 5px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    color: "#7f7f7f" + " !important",
    marginLeft: "0px",
    // "&:last-child": {
    //   marginLeft: "0px",
    //   borderRight: "none !important",
    // },
    // "&:first-child": {
    //   marginLeft: "0px",
    // },
  },
  tabSelected: {
    backgroundColor: "rgba(" + hexToRgb(blueColor) + ", 0.2)",
    transition: "0.2s background-color 0.1s",

    color: blueColor + " !important",
  },
  styleLessTabSelected: {
    color: blueColor + " !important",
    fontWeight: "bold",

    transition: "0.2s color 0.1s",
  },
  tabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    fontWeight: "300",
    fontSize: "12px",
    marginTop: "1px",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-1px 5px 0 0 !important",
    },
  },

  styleLessTabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    // fontWeight: "500",
    // fontSize: "12px",
    textTransform: "none",
    fontSize: "15px",
    paddingRight: "15px",

    marginTop: "1px",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-1px 5px 0 0 !important",
    },
  },
  verticalTabWrapper: {
    display: "inline-block",

    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    // background: "red",
    /*
    Text Overflow 
    */
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // wordWrap: "break-word !important",

    textTransform: "none",
    fontSize: "15px",
    paddingRight: "15px",

    marginTop: "1px",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-1px 5px 0 0 !important",
    },
  },
};

export default customTabsStyle;
