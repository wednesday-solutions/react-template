import { createBrowserHistory } from 'history';
import { isUAT } from './index';

export function getBaseName() {
  if (isUAT()) {
    return `/${process.env.BRANCH_NAME}`;
  }

  return '';
}

const history = createBrowserHistory({ basename: getBaseName() });
export default history;
