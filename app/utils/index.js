import find from 'lodash/find';
import get from 'lodash/get';
import { i18n } from '@lingui/core';
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
export const mapKeysDeep = (obj, fn) => {
  if (Array.isArray(obj)) {
    return obj.map((val) => mapKeysDeep(val, fn));
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, current) => {
      const key = fn(current);
      const val = obj[current];
      acc[key] = val !== null && typeof val === 'object' ? mapKeysDeep(val, fn) : val;
      return acc;
    }, {});
  }
  return obj;
};

export const isLocal = () => {
  try {
    const local = JSON.parse(process.env.IS_LOCAL);
    return typeof local === 'boolean' && local;
  } catch {
    // continue regardless of error
  }
  return false;
};

export function isUAT() {
  return process.env.ENVIRONMENT_NAME === 'development' && process.env.NODE_ENV === 'production';
}

export function isProd() {
  return process.env.ENVIRONMENT_NAME === 'production' && process.env.NODE_ENV === 'production';
}

export const translate = (id, values = {}) => i18n._({ id, values });
