/**
 * Asynchronously loads the component for ITunesSearch
 */

import loadable from '@utils/loadable';

export default loadable(() => import('./index'));
