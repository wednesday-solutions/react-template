import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesSearch state domain
 */
const selectITunesSearchDomain = (state) => state.itunesSearch || initialState;

/**
 * Select the tracks
 */
export const selectTracks = createSelector(selectITunesSearchDomain, (substate) => substate.tracks);

/**
 * Select the loading status
 */
export const selectLoading = createSelector(selectITunesSearchDomain, (substate) => substate.loading);

/**
 * Select the error
 */
export const selectError = createSelector(selectITunesSearchDomain, (substate) => substate.error);

/**
 * Select the current search query
 */
export const selectQuery = createSelector(selectITunesSearchDomain, (substate) => substate.query);
