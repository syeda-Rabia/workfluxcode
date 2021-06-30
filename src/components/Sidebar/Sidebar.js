/*eslint-disable*/
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Divider, IconButton, SwipeableDrawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { Button } from "@material-ui/core";
import workfluxeLogo from "assets/img/logo.png";
import { useHistory } from "react-router-dom";
import Timer from "components/Timer/Timer";
import CreateButton from "components/CreateButton/CreateButton";
import Logout from "components/Logout/Logout";
import { connect } from "react-redux";
import NewTimer from "components/Timer/NewTimer";

const useStyles = makeStyles(styles);

function Sidebar(props) {
  const [createOpen, setCreateOpen] = useState(false);

  const toggleDrawer = (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setCreateOpen(!createOpen);
  };

  const classes = useStyles();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const {
    color,
    logo,
    image,
    logoText,
    routes,
    handleOpenDrawerToggle
  } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        // if (prop.path === "/upgrade-to-pro") {
        //   activePro = classes.activePro + " ";
        //   listItemClasses = classNames({
        //     [" " + classes[color]]: true,
        //   });
        // } else {}

        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });

        // Change this if you want to change the Sidebar font color
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });

        const blueFontClasses = classNames({
          [" " + classes.blueFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, blueFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, blueFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, blueFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={workfluxeLogo} width="150px" alt="logo" />
      </div>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          variant="temporary"
          anchor={"left"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, classes.drawerPaperRTL)
          }}
          onClose={props.handleDrawerToggle}
          onOpen={props.handleOpenDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div
            className="mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {props.userType == 0 ? <CreateButton /> : null}
          </div>

          <Divider />
          <div className={classes.sidebarWrapper}>
            <div
              onClick={props.handleDrawerToggle} //remove this if you don't want to close sidebar onClick
            >
              {links}
            </div>
            {props.userType == 0 ? <Timer /> : null}
            <Logout />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div
            className="mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {props.userType == 0 ? <CreateButton /> : null}
          </div>

          <Divider />

          <div className={classes.sidebarWrapper}>
            {links}

            {props.userType == 0 ? <NewTimer /> : null}

            <Logout />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}
const mapStatetoProps = (state) => {
  console.log(state, "sidebar");
  return {
    userType: state.Login.user_info.role.title
  };
};

export default connect(mapStatetoProps)(Sidebar);
Sidebar.propTypes = {
  userType: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
  handleOpenDrawerToggle: PropTypes.func,
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
