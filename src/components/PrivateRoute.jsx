import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ role, allowedRole, children }) {
  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;
