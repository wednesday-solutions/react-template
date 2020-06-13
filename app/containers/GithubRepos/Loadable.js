/**
 * Asynchronously loads the component for GithubRepos
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
