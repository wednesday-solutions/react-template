/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: {}
});
export const initialState = { repoName: null, reposData: {}, reposError: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_GITHUB_REPOS:
        draft.repoName = action.repoName;
        break;
      case homeContainerTypes.CLEAR_GITHUB_REPOS:
        draft.repoName = null;
        draft.reposError = null;
        draft.reposData = {};
        break;
      case homeContainerTypes.SUCCESS_GET_GITHUB_REPOS:
        draft.reposData = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_GITHUB_REPOS:
        draft.reposError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
