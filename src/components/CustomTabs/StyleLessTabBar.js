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

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";

const useStyles = makeStyles(styles);

export default function StyleLessTabBar(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const classes = useStyles();
  const { tabs } = props;

  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        classes={{
          indicator: classes.displayNone,
          // scrollButtons: classes.displayNone,
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
                root: classes.styleLesstabRootButton,
                selected: classes.styleLessTabSelected,
                wrapper: classes.styleLessTabWrapper,
              }}
              key={key}
              label={prop.tabName}
              {...icon}
            />
          );
        })}
      </Tabs>

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

StyleLessTabBar.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  plainTabs: PropTypes.bool,
};
