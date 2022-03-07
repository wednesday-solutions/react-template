import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import routeConstants from './routeConstants';

const routes = Object.keys(routeConstants);

export function findCommonRoutePrefix(routeArr) {
  let maxCommon = routeArr[0];
  for (let i = 1; i < routeArr.length; i++) {
    stringLoop: for (let j = 0; j < maxCommon.length; j++) {
      if (!routeArr[i][j]) {
        maxCommon = routeArr[i];
        break stringLoop;
      } else if (maxCommon[j] !== routeArr[i][j]) {
        maxCommon = routeArr[i].substring(0, j);
        break stringLoop;
      }
    }
  }
  return maxCommon;
}

/** @param {string} pathname */
export function getBaseUrl(pathname) {
  let baseURL = '';

  if (process.env.ENVIRONMENT_NAME === 'production') {
    baseURL = '/react-template';
  }

  if (process.env.ENVIRONMENT_NAME === 'uat') {
    let baseURLCollection = [];

    routes.forEach((routeKey) => {
      const route = routeConstants[routeKey].route;

      if (pathname.includes(route)) {
        // feat/repos /repos
        if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
          baseURLCollection.push(pathname.substring(0, pathname.length - route.length));
        }
        if (pathname.substring(pathname.length - route.length - 1, pathname.length) === `${route}/`) {
          baseURLCollection.push(pathname.substring(0, pathname.length - route.length - 1));
        }
      } else {
        if (route.includes(':')) {
          const regex = /^(?!:)\/[\w]+/;
          const matches = regex.exec(route);

          let matchLastIndex = pathname.lastIndexOf(matches[0]);
          const pathToMatch = pathname.substring(matchLastIndex);
          const isMatch = matchPath(pathToMatch, {
            path: route,
            exact: true
          });
          if (isMatch) {
            baseURLCollection.push(pathname.substring(0, matchLastIndex));
          }
        }
      }
    });
    if (!baseURLCollection.length) {
      baseURL = pathname;
    } else {
      baseURL = findCommonRoutePrefix(baseURLCollection);
    }
  }
  return baseURL;
}

const history = createBrowserHistory({ basename: getBaseUrl(window.location.pathname) });
export default history;
