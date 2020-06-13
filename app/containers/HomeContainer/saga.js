import { put, call, takeEvery } from 'redux-saga/effects';
import { getRepos, getSongs } from '@services/api';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const {
  REQUEST_GET_GITHUB_REPOS,
  REQUEST_GET_ARTIST_SONGS
} = homeContainerTypes;
const {
  successGetGithubRepos,
  failureGetGithubRepos,
  successGetArtistSongs,
  failureGetArtistSongs
} = homeContainerCreators;

export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}

export function* getArtistSongs(action) {
  const response = yield call(getSongs, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtistSongs(data));
  } else {
    yield put(failureGetArtistSongs(data));
  }
}

// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeEvery(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
  yield takeEvery(REQUEST_GET_ARTIST_SONGS, getArtistSongs);
}
