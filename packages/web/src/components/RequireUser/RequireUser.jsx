import { useLocation, useParams, Navigate, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

// Require username of logged in user to match the username of requested route.
// Or if the user is an admin.
export default function RequireUser({ allowedRole }) {
  const { user } = useUser();
  const { username } = useParams();
  const location = useLocation();

  return (
    // If user is an admin or user is the user of the requested page
    ((user?.role?.includes(allowedRole) || user?.username === username) &&
      <Outlet />
    ) ||
    (user?.accessToken &&
      <Navigate to="/unauthorized" replace state={{ from: location }} />) ||
    (<Navigate to="/login" replace state={{ from: location }} />)
  );
}

