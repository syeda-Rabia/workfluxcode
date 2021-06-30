import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { welcomeScreenRoutes } from "routes.js";
import ProfileActivation from "views/Authentication/ProfileActivation";

function Welcome(props) {
  const switchRoutes = (
    <Switch>
      {welcomeScreenRoutes.map((prop, key) => {
        if (prop.layout === "/user" && prop.visible && !props.logged) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }

        return null;
      })}
      {props.logged === false && (
        <Route
          path="/user/profile-activation/:userId/:projectId?/:userType?/:ownerId"
          component={ProfileActivation}
        />
      )}

      {props.userType == "superadmin" ? (
        <Redirect from="/user" to="/su/clients-management" />
      ) : (
        <Redirect from="/user" to="/app/projects" />
      )}

      <Redirect from="/user" to="/user/welcome" />
    </Switch>
  );
  return <div>{switchRoutes}</div>;
}
const mapStatetoProps = (state) => {
  console.log(state);
  return {
    logged: state.Login.logged,
    userType: state.Login.user_info?.role?.title,
  };
};

export default connect(mapStatetoProps)(Welcome);
