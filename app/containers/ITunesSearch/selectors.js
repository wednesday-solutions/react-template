import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesSearch state domain
 */

const selectITunesSearchDomain = state => state.iTunesSearch || initialState;

export const makeSelectITunesSearch = () =>
  createSelector(
    selectITunesSearchDomain,
    substate => substate
  );

export const selectTracksData = () =>
  createSelector(
    selectITunesSearchDomain,
    substate => get(substate, 'tracks', null)
  );

export const selectTracksError = () =>
  createSelector(
    selectITunesSearchDomain,
    substate => get(substate, 'tracksError', null)
  );

export const selectArtistName = () =>
  createSelector(
    selectITunesSearchDomain,
    substate => get(substate, 'artistName', null)
  );

export { selectITunesSearchDomain };
