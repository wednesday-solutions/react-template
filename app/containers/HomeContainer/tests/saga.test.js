/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getGithubRepos } from '../saga';
import { requestGetGithubRepos, successGetGithubRepos, failureGetGithubRepos } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const repoName = 'mac';
  let getGithubReposGenerator = getGithubRepos({ payload: repoName });

  it('should start task to watch for requestGetGithubRepos action', () => {
    expect(generator.next().value).toEqual(takeLatest(requestGetGithubRepos.toString(), getGithubRepos));
  });

  it('should ensure that the action failureGetGithubRepos is dispatched when the api call fails', () => {
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: failureGetGithubRepos.toString(),
        payload: errorResponse
      })
    );
  });

  it('should ensure that the action successGetGithubRepos is dispatched when the api call succeeds', () => {
    getGithubReposGenerator = getGithubRepos({ payload: repoName });
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const reposResponse = {
      totalCount: 1,
      items: [{ repositoryName: repoName }]
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: successGetGithubRepos.toString(),
        payload: reposResponse
      })
    );
  });
});
