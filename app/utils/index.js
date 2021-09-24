import find from 'lodash/find';
import get from 'lodash/get';
import routeConstants from './routeConstants';

/**
 * Get details of the current route from the route config.
 * If location.pathname doesn't match any entry in the routeConstants it will return null
 * @author mac
 * @date 2020-05-07
 * @param {any} location
 * @returns {any}
 */
export const getCurrentRouteDetails = (location) => {
  if (!get(location, 'pathname')) {
    return null;
  }
  const route = find(
    Object.keys(routeConstants),
    (key) => routeConstants[key].route === location.pathname || `${routeConstants[key].route}/` === location.pathname
  );
  if (route) {
    return routeConstants[route];
  }
  return null;
};
export const mapKeysDeep = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => mapKeysDeep(val, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] = val !== null && typeof val === 'object' ? mapKeysDeep(val, fn) : val;
        return acc;
      }, {})
    : obj;

export const isLocal = () => {
  try {
    const local = JSON.parse(process.env.IS_LOCAL);
    return typeof local === 'boolean' && local;
  } catch {
    // continue regardless of error
  }
  return false;
};
