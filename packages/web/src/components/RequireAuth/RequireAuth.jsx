import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import PropTypes from 'prop-types';

export default function RequireAuth({ allowedRole }) {
  const { user } = useUser();
  const location = useLocation();

  return (
    user?.role?.includes(allowedRole)
      ? <Outlet />
      : user?.accessToken
        ? <Navigate to="/unauthorized" replace state={{ from: location }} />
        : <Navigate to="/login" replace state={{ from: location }} />
  );
}

RequireAuth.propTypes = {
  allowedRole: PropTypes.string.isRequired, // or PropTypes.arrayOf(PropTypes.string)
};