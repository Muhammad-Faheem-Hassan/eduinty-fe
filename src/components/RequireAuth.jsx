// src/components/RequireAuth.jsx
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const auth = localStorage.getItem("auth");
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
