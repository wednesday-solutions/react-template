import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@app/services/songsApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES_SONGS } = itunesContainerTypes;
const { successGetItunesSongs, failureGetItunesSongs } = itunesContainerCreators;
export function* getItunesSongs(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesSongs(data));
  } else {
    yield put(failureGetItunesSongs(data));
  }
}
// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_SONGS, getItunesSongs);
}
