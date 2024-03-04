import { createBrowserHistory } from 'history';
import { isUAT } from './index';

/**
 * Gets the base name for the application based on the environment.
 * In UAT (User Acceptance Testing), it returns the branch name as the base name.
 * In other environments, it returns an empty string.
 *
 * @date 01/03/2024 - 14:44:39
 *
 * @export
 * @returns {string} The base name for the application.
 */
export function getBaseName() {
  if (isUAT()) {
    return `/${process.env.BRANCH_NAME}`;
  }

  return '';
}

const history = createBrowserHistory({ basename: getBaseName() });
export default history;
