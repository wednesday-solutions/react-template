import { createSelector } from 'reselect';
import get from 'lodash/get';
import { iTunesServiceInitialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = (state) => state.homeContainer || iTunesServiceInitialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */
// is this wrong? https://redux.js.org/usage/deriving-data-selectors#createselector-overview Read the Warning

export const selectHomeContainer = () => createSelector(selectHomeContainerDomain, (substate) => substate);
//export const selectHomeContainer = () => selectHomeContainerDomain()

export const selectSearchData = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchData', null));

export const selectSearchError = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchError', null));

export const selectSearchTerm = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'searchTerm', null));

export default selectHomeContainer;
