/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_GITHUB_REPOS:
        return initialState.set('repoName', action.repoName);
      case homeContainerTypes.CLEAR_GITHUB_REPOS:
        return initialState.set('repoName', null).set('reposData', null);
      case homeContainerTypes.SUCCESS_GET_GITHUB_REPOS:
        return state.set('reposData', action.data);
      case homeContainerTypes.FAILURE_GET_GITHUB_REPOS:
        return state.set(
          'reposError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default homeContainerReducer;
