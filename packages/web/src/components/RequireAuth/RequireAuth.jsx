import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function RequireAuth({ allowedRole }) {
  const { user } = useUser();
  const location = useLocation();

  return (
    user?.role?.includes(allowedRole)
      ? <Outlet />
      : user?.accessToken
        ? < Navigate to="/unauthorized" replace state={{ from: location}} />
        : < Navigate to="/login" replace state={{ from: location}} />
  );
}