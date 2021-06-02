import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the HomeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );
export const selectSongsData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'songsData', null)
  );
export const selectSongName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'songName', null)
  );
export const selectSongsError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'songsError', null)
  );
