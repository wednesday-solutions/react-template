import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectITunesContainerDomain = state => state.iTuneContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectITunesContainer = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => substate
  );

export const selectITunesData = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'iTunesData', null)
  );

export const selectITunesError = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'iTunesError', null)
  );

export const selectITuneName = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'iTuneName', null)
  );
export const selectCurrentTune = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'currentTune', null)
  );

export const selectSelectedTune = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'selectedTune', null)
  );

export default selectITunesContainer;
