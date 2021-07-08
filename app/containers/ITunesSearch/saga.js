import { takeLatest, call, put } from 'redux-saga/effects';
import { iTunesSearchTypes, iTunesSearchCreators } from './reducer';
import { getTracks } from '@services/itunesApi';
// Individual exports for testing
const { REQUEST_GET_TRACK_NAMES } = iTunesSearchTypes;
const { successGetTrackNames, failureGetTrackNames } = iTunesSearchCreators;

export function* fetchTracks(action) {
  const response = yield call(getTracks, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackNames(data));
  } else {
    yield put(failureGetTrackNames(data));
  }
}

export default function* iTunesSearchSaga() {
  yield takeLatest(REQUEST_GET_TRACK_NAMES, fetchTracks);
}
