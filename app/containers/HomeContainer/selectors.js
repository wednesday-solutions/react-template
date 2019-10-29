import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state =>
  (state.homeContainer || initialState).toJS();

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
    substate => _.get(substate, 'reposData', null)
  );

export const selectReposError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'reposError', null)
  );

export const selectRepoName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'repoName', null)
  );

export default selectHomeContainer;
