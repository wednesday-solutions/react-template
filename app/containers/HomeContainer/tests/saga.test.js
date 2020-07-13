/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getGithubRepos } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const repoName = 'mac';
  let getGithubReposGenerator = getGithubRepos({ repoName });

  it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_GITHUB_REPOS, getGithubRepos));
  });

  it('should ensure that the action FAILURE_GET_GITHUB_REPOS is dispatched when the api call fails', () => {
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_GITHUB_REPOS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getGithubReposGenerator = getGithubRepos({ repoName });
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const reposResponse = {
      totalCount: 1,
      items: [{ repositoryName: repoName }]
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_GITHUB_REPOS,
        data: reposResponse
      })
    );
  });
});
