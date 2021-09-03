import { createSelector } from 'reselect';
import get from 'lodash/get';
import { iTunesServiceInitialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */
/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */
// is this wrong? https://redux.js.org/usage/deriving-data-selectors#createselector-overview. Read the Warning
// we have DRY breakage here...
//export const selectHomeContainer = () => createSelector(selectHomeContainerDomain, (substate) => substate);
export const selectHomeContainer = (state) => state.homeContainer || iTunesServiceInitialState;

export const selectSearchData = () =>
  createSelector(selectHomeContainer, (substate) => get(substate, 'searchData', null));

export const selectSearchError = () =>
  createSelector(selectHomeContainer, (substate) => get(substate, 'searchError', null));

export const selectSearchTerm = () =>
  createSelector(selectHomeContainer, (substate) => get(substate, 'searchTerm', null));

export default selectHomeContainer;
