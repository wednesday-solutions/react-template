import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs, getTrack } from '@services/songApi';
import { songContainerTypes, songContainerCreators } from './reducer';

const { REQUEST_GET_SONGS, REQUEST_GET_TRACK } = songContainerTypes;
const { successGetSongs, failureGetSongs } = songContainerCreators;
export function* getSongResults(action) {
  const response = yield call(getSongs, action.query);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
export function* getTrackResults(action) {
  const response = yield call(getTrack, action.id);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export function* songContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongResults);
  yield takeLatest(REQUEST_GET_TRACK, getTrackResults);
}
