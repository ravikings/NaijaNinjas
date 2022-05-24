import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, path, checkRunner }) => {
  const auth = useAuth();
  const refresh = Cookies.get("refresh_token");

  if (!refresh) {
    return <Redirect to='/login' />;
  }

  if (!auth.loading && auth.isVerified) {
    if (!checkRunner) {
      return <Route component={Component} exact path={path} />;
    }
    // if (checkRunner) {
    //   console.log(
    //     auth.userStatus && auth.userStatus.is_a_runner,
    //     "auth.userStatus"
    //   );
    //   if (auth.userStatus && auth.userStatus.is_a_runner) {
    //     return <Route path={path} component={Component} />;
    //   } else {
    //     return <Redirect to='/' />;
    //   }
    // }
  }

  setTimeout(() => {
    return <Redirect to='/login' />;
  }, 500);

  return <></>;
};

export default PrivateRoute;
