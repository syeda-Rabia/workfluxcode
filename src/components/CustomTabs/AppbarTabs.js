import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";
import { AppBar } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";

const useStyles = makeStyles(styles);

export default function AppbarTabs(props) {
  const classes = useStyles();
  const {
    headerColor,
    plainTabs,
    tabs,
    title,
    rtlActive,
    value,
    handleChange,
  } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  });
  return (
    <>
      {/* <Card>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? (
            <div className={cardTitle}>{title}</div>
          ) : null} */}
      <AppBar
        style={{
          backgroundColor: "#FAFBFD",
          borderRadius: "5px",
          boxShadow: "none",
        }}
        position="static"
        color="primary"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </AppBar>

      {/* </CardHeader>
      </Card> */}
      <div className="mt-3">
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </div>
    </>
  );
}

AppbarTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
};
