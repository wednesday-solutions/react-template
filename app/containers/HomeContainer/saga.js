import { put, call, takeLatest } from 'redux-saga/effects'
import { getRepos } from '@services/repoApi'
import { REQUEST_GET_GITHUB_REPOS } from './constants'
import { successGithubRepos, failureGithubRepos } from './actions'

export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName)
  const { data, error, ok } = response
  if (ok) {
    yield put(successGithubRepos(data))
  } else {
    yield put(failureGithubRepos(error))
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos)
}
