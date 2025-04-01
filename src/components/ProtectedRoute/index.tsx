import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/auth";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = isTokenValid();
  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
