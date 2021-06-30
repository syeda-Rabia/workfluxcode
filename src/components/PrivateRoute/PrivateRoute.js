import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, logged, userType, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

const mapStatetoProps = (state) => {
  return {
    logged: state.Login.logged,
    userType: state.Login.userType,
  };
};

export default connect(mapStatetoProps)(PrivateRoute);
