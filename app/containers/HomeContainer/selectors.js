import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

export const selectHomeContainerDomain = (state) => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectReposData = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'reposData'));

export const selectLoading = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'loading'));

export const selectReposError = () =>
  createSelector(selectHomeContainerDomain, (substate) => get(substate, 'reposError'));

export const selectRepoName = () => createSelector(selectHomeContainerDomain, (substate) => get(substate, 'repoName'));
