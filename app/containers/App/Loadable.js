/**
 *
 * Asynchronously loads the component for App
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
