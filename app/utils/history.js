import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import { isProd, isUAT } from './index';
import routeConstants from './routeConstants';

const routes = Object.keys(routeConstants);

/** @param {string} pathname */
export function getBaseUrl(pathname) {
  if (isProd()) {
    // GH Pages
    return '/react-template';
  }

  if (!isUAT()) {
    return '';
  }

  let baseURL = '';

  let isMatchedOnce = false;
  routes.forEach((routeKey) => {
    /** @type {string} */
    const route = routeConstants[routeKey].route;

    if (pathname.includes(route)) {
      if (pathname.endsWith(route)) {
        baseURL = pathname.substring(0, pathname.length - route.length);
        isMatchedOnce = true;
      } else if (pathname.endsWith(`${route}/`)) {
        baseURL = pathname.substring(0, pathname.length - route.length - 1);
        isMatchedOnce = true;
      }
    } else if (route.includes(':')) {
      const routeSplitArr = route.split('/').filter((val) => val !== '');
      const match = '/' + routeSplitArr[0];
      const matchLastIndex = pathname.lastIndexOf(match);
      const pathToMatch = pathname.substring(matchLastIndex);
      const isMatch = matchPath(pathToMatch, {
        path: route,
        exact: true
      });
      if (isMatch) {
        baseURL = pathname.substring(0, matchLastIndex);
        isMatchedOnce = true;
      }
    }
  });
  if (!isMatchedOnce) {
    baseURL = pathname;
  }

  return baseURL;
}

const history = createBrowserHistory({ basename: getBaseUrl(window.location.pathname) });
export default history;
