/**
 * Asynchronously loads the component for ItunesSongs
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
