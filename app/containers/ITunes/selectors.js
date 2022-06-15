import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunes state domain
 */

const selectITunesDomain = (state) => state.iTunesContainer || initialState;

const makeSelectITunes = () => createSelector(selectITunesDomain, (substate) => substate);

export default makeSelectITunes;
export { selectITunesDomain };

export const selectSongs = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songs'));

export const selectError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'error'));

export const selectSearchTerm = () => createSelector(selectITunesDomain, (substate) => get(substate, 'searchTerm'));
