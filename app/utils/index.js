import { routeConfig } from '@app/routeConfig';
import find from 'lodash/find';
import get from 'lodash/get';

/**
 * Get details of the current route from the route config.
 * If location.pathname doesn't match any entry in the routeConfig it will return null
 * @author mac
 * @date 2020-05-07
 * @param {any} location
 * @returns {any}
 */
export const getCurrentRouteDetails = location => {
  if (!get(location, 'pathname')) {
    return null;
  }
  const route = find(
    Object.keys(routeConfig),
    key =>
      routeConfig[key].route === location.pathname ||
      `${routeConfig[key].route}/` === location.pathname
  );
  if (route) {
    return routeConfig[route];
  }
  return null;
};
