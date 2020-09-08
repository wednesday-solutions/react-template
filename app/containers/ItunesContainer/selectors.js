import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectItunesContainerDomain = state => state.itunesContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectItunesContainer = () =>
  createSelector(
    selectItunesContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectItunesContainerDomain,
    substate => get(substate, 'songsData', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectItunesContainerDomain,
    substate => get(substate, 'songsError', null)
  );

export const selectSongName = () =>
  createSelector(
    selectItunesContainerDomain,
    substate => get(substate, 'songName', null)
  );

export default selectItunesContainer;
