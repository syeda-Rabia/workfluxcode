// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/img/reactlogo.png";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import Project from "views/Project/Project";
import ReactDnd from "components/TestComponents/ReactDnd";

let ps;

const useStyles = makeStyles(styles);

function Admin({ ...rest }) {
  // styles
  console.log(rest.userType, "admin screen");
  const switchRoutes = (
    <Switch>
      {routes(rest.userType).map((prop, key) => {
        if (prop.layout === "/app" && prop.visible) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              exact
            />
          );
        }
        return null;
      })}
      {/* <Route path="/app/invite" component={InviteNewPeople} />
      <Route path="/app/new-client" component={NewClient} />
      <Route path="/app/setting" component={Setting} />
      <Route path="/app/template" component={Template} />
      <Route path="/app/create-contract" component={CreateNewContract} />
      <Route path="/app/purposal" component={Purposal} /> */}
      <Route path="/app/test" component={ReactDnd} />
      <Route path="/app/projects/:projectName" component={Project} />
      <Redirect from="/app" to="/app/projects" />
    </Switch>
  );

  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  // eslint-disable-next-line no-unused-vars
  const [color, setColor] = React.useState("borderBlue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOpenDrawerToggle = () => {
    setMobileOpen(true);
  };
  const getRoute = () => {
    return window.location.pathname !== "/app/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes(rest.userType).filter(
          (route) => route.visible === true && route.sidebarVisible
        )}
        logoText={"WorkFluxe"}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        handleOpenDrawerToggle={handleOpenDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes(rest.userType)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {/* {getRoute() ? <Footer /> : null} */}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  console.log(state);
  return {
    userType: state.Login.user_info?.role?.title,
  };
};
export default connect(mapStatetoProps)(Admin);
