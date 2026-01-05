import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

const ProtectedRoute = ({ children }) => {
  console.log("isAuth", isAuthenticated());
  //replace
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
