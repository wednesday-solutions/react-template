import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the SongContainer state domain
 */

const selectSongContainerDomain = state => state.songContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SongContainer
 */

export const selectSongContainer = () =>
  createSelector(
    selectSongContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectSongContainerDomain,
    substate => get(substate, 'itunesData', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectSongContainerDomain,
    substate => get(substate, 'itunesError', null)
  );

export const selectSongName = () =>
  createSelector(
    selectSongContainerDomain,
    substate => get(substate, 'artistName', null)
  );

export default selectSongContainer;
