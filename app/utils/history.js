import { createBrowserHistory } from 'history';
import { isProd, isUAT } from './index';

export function getBaseUrl() {
  if (isProd()) {
    // GH Pages
    return '/react-template';
  }
  if (!isUAT()) {
    return '';
  }

  return process.env.BRANCH_NAME ? `/${process.env.BRANCH_NAME}` : window.location.pathname.replace('/index.html', '');
}

const history = createBrowserHistory({ basename: getBaseUrl() });
export default history;
