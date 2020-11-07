import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

const User = () => {
  return (
    <Switch>
      <Route path="/users/login/" exact component={LoginForm}></Route>
      <Route path="/users/register" exact component={RegisterForm}></Route>
    </Switch>
  );
};

export default User;
