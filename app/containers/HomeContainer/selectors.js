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

// itunes songs selectors
export const selectArtistName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'artistName', null)
  );

export const selectSongsData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'songsData', null)
  );

export const selectSongsCount = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'songsCount', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'songsError', null)
  );

export default selectHomeContainer;
