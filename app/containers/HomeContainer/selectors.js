import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

export const selectHomeContainerDomain = (state) => state.home || initialState;

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () => createSelector(selectHomeContainerDomain, (substate) => substate);

/**
 * Other specific selectors
 */

export const selectReposData = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'data'));

export const selectReposError = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'error'));

export const selectRepoName = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'repo'));

export default selectHomeContainer;
