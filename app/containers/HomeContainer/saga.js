import { getRepos } from '@services/repoApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { requestGetGithubRepos, successGetGithubRepos, failureGetGithubRepos } from './reducer';

export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.payload);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}

// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(requestGetGithubRepos.toString(), getGithubRepos);
}
