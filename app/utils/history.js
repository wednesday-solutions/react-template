import { createBrowserHistory } from 'history';
import { isProd, isUAT } from './index';

export function getBaseName() {
  if (isProd()) {
    // GH Pages
    return '/react-template';
  }
  if (isUAT()) {
    return `/${process.env.BRANCH_NAME}`;
  }

  return '';
}

const history = createBrowserHistory({ basename: getBaseName() });
export default history;
