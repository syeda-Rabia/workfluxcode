import React, { Suspense, lazy } from "react";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import Welcome from "layouts/Welcome";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Admin from "layouts/Admin.js";
import SuperAdmin from "layouts/SuperAdmin";
import "./App.scss";

// const SuperAdmin = lazy(() => import("layouts/SuperAdmin"));
// const Admin = lazy(() => import("layouts/Admin.js"));

function App(props) {
  return (
    <>
      {/* <Suspense fallback={<div className="lazyLoading"></div>}> */}
      <Switch>
        <Route path="/user" component={Welcome} />

        {props.userType == "superadmin" ? (
          <PrivateRoute path="/su" component={SuperAdmin} />
        ) : (
          <PrivateRoute path="/app" component={Admin} />
        )}

        {props.logged ? (
          <Redirect from="/" to="/app/overview" />
        ) : (
          <Redirect from="/" to="/user/welcome" />
        )}
      </Switch>
      {/* </Suspense> */}
    </>
  );
}
const mapStatetoProps = (state) => {
  return {
    logged: state.Login.logged,
    userType: state.Login.user_info?.role?.title,
  };
};

export default connect(mapStatetoProps)(App);
