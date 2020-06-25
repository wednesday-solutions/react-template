import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/itunesAPI';
import { songContainerTypes, songContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = songContainerTypes;
const { successGetSongs, failureGetSongs } = songContainerCreators;
export function* getItunesSongs(action) {
  const response = yield call(getSongs, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* songContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getItunesSongs);
}
