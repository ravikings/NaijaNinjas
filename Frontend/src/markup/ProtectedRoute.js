import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component, path }) => {
  const auth = useAuth();
  if (!auth.currentUser) {
    return <Route component={Component} path={path} />;
  }

  return <Redirect to='/' />;
};

export default ProtectedRoute;
