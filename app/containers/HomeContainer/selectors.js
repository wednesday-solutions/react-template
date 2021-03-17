import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectitunesData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'itunesData', null)
  );

export const selectitunesError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'itunesError', null)
  );

export const selectartistName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'artistName', null)
  );

export default selectHomeContainer;
