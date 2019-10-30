/**
 *
 * Asynchronously loads the component for HomeContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
