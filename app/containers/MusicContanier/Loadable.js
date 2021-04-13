/**
 *
 * Asynchronously loads the component for MusicContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
