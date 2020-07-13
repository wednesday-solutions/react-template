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

export const selectReposData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'reposData', null)
  );

export const selectReposError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'reposError', null)
  );

export const selectRepoName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'repoName', null)
  );

export default selectHomeContainer;
