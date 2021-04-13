import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectMusicContainerDomain = state => state.musicContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectMusicContainer = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => substate
  );

export const selectMusicsData = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicsData', null)
  );

export const selectMusicsError = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicsError', null)
  );

export const selectMusicTitle = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicTitle', null)
  );

export default selectMusicContainer;
