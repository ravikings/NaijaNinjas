import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, path }) => {
  const auth = useAuth();
  const refresh = Cookies.get("refresh_token");

  if (!refresh) {
    return <Redirect to='/login' />;
  }

  if ((!auth.loading || !auth.gettingToken) && auth.isVerified) {
    console.log("Working");
    return <Route component={Component} path={path} />;
  }

  setTimeout(() => {
    return <Redirect to='/login' />;
  }, 500);

  return <></>;
};

export default PrivateRoute;
