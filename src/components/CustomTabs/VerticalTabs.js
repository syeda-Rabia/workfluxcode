import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
// core components

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";
import { Col, Row } from "react-bootstrap";
import GridContainer from "components/Grid/GridContainer";

const useStyles = makeStyles(styles);

export default function VerticalTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const classes = useStyles();
  const { tabs } = props;
  const theme = useTheme();

  const orientation = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Row className="ml-0">
      <Col sm={2} md={2} lg={2} className="p-2">
        <Tabs
          orientation={orientation ? "horizontal" : "vertical"}
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          classes={{
            root: classes.verticalTabsRoot,
            indicator: classes.displayNone,
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
                  root: classes.verticaltabRootButton,
                  selected: classes.styleLessTabSelected,
                  wrapper: classes.verticalTabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </Col>
      <Col sm={10} md={10} lg={10}>
        <div>
          {tabs.map((prop, key) => {
            if (key === value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </div>
      </Col>
    </Row>
  );
}

VerticalTabs.propTypes = {
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
