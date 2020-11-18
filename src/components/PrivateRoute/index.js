import { useAuthContext } from "../../context/AuthContext";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authData } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authData.userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to="/users/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
