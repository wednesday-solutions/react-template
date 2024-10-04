import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

export const selectSongsContainerDomain = (state) => state.songsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectSongsData = () =>
  createSelector(selectSongsContainerDomain, (substate) => get(substate, 'songsData'));

export const selectLoading = () => createSelector(selectSongsContainerDomain, (substate) => get(substate, 'loading'));

export const selectSongsError = () =>
  createSelector(selectSongsContainerDomain, (substate) => get(substate, 'songsError'));

export const selectSongName = () => createSelector(selectSongsContainerDomain, (substate) => get(substate, 'songName'));
