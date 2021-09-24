/**
 *
 * ProtectedRoute
 *
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routeConstants from '@utils/routeConstants';

const ProtectedRoute = ({ isUserVerified, render: C, isLoggedIn, handleLogout, ...rest }) => {
  const isUnprotectedRoute =
    Object.keys(routeConstants)
      .filter((key) => !routeConstants[key].isProtected)
      .map((key) => routeConstants[key].route)
      .includes(rest.path) && rest.exact;

  const handleRedirection = (renderProps) => {
    let to;
    if (!isLoggedIn) {
      // user is not logged in
      if (!isUnprotectedRoute) {
        to = routeConstants.login.route;
        handleLogout();
      } else {
        // not logged in and trying to access an unprotected route so don't redirect
        return <C {...renderProps} />;
      }
    } else {
      // user is logged in
      if (isUnprotectedRoute) {
        to = routeConstants.dashboard.route;
      } else {
        // logged in and accessing a protected route
        return <C {...renderProps} />;
      }
    }
    return <Redirect to={to} />;
  };
  return <Route {...rest} render={handleRedirection} />;
};

ProtectedRoute.propTypes = {
  render: PropTypes.any,
  isLoggedIn: PropTypes.bool,
  isUserVerified: PropTypes.bool,
  handleLogout: PropTypes.func
};

export default ProtectedRoute;
