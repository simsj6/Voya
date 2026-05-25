import { Navigate, Outlet } from "react-router-dom";

// Based on Assignment 7's ProtectedRoute.
// Routes nested under this component require a token in localStorage.
function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
