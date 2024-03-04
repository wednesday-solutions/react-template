import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_GITHUB_REPOS } = homeContainerTypes;
const { successGetGithubRepos, failureGetGithubRepos } = homeContainerCreators;

/**
 * A saga that handles fetching GitHub repositories based on a given repository name.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the repository name.
 * @yields {Effect} The effect of calling the API, and then either the success or failure action.
 */
export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}

/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
}
