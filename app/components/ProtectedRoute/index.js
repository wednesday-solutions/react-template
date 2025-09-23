/**
 *
 * ProtectedRoute
 *
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import routeConstants from '@utils/routeConstants';

const ProtectedRoute = ({ component: Component, isLoggedIn, handleLogout, ...rest }) => {
  const location = useLocation();

  const getUnprotectedRoutes = () =>
    Object.keys(routeConstants)
      .filter((key) => !routeConstants[key].isProtected)
      .map((key) => routeConstants[key].route);

  const isUnprotectedRoute = getUnprotectedRoutes().includes(location.pathname);

  const handleNotLoggedIn = () => {
    if (isUnprotectedRoute) {
      return <Component {...rest} />;
    }
    if (handleLogout) {
      handleLogout();
    }
    return <Navigate to={routeConstants.login?.route || '/'} replace />;
  };

  const handleLoggedIn = () => {
    if (isUnprotectedRoute) {
      return <Navigate to={routeConstants.dashboard?.route || '/'} replace />;
    }
    return <Component {...rest} />;
  };

  return isLoggedIn ? handleLoggedIn() : handleNotLoggedIn();
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  isLoggedIn: PropTypes.bool,
  isUserVerified: PropTypes.bool,
  handleLogout: PropTypes.func
};

export default ProtectedRoute;
