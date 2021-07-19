import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the songContainer state domain
 */

const selectSongContainerDomain = state => state.songContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectSongContainer = () => createSelector(selectSongContainerDomain, substate => substate);

export const selectSongsData = () =>
  createSelector(selectSongContainerDomain, substate => get(substate, 'songsData', null));

export const selectSongsError = () =>
  createSelector(selectSongContainerDomain, substate => get(substate, 'songsError', null));

export const selectQuery = () => createSelector(selectSongContainerDomain, substate => get(substate, 'query', null));

export const selectLoading = () =>
  createSelector(selectSongContainerDomain, substate => get(substate, 'loading', null));

export const selectTrackData = () =>
  createSelector(selectSongContainerDomain, substate => get(substate, 'trackData', null));

export const selectTrackError = () =>
  createSelector(selectSongContainerDomain, substate => get(substate, 'trackError', null));
export default selectSongContainer;
