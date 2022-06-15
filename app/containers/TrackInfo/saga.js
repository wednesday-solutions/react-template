import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongDetails } from '@app/services/itunesApi';
import { trackInfoTypes, trackInfoCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_SONG_DETAILS } = trackInfoTypes;
const { successGetSongDetails, errorGetSongDetails } = trackInfoCreators;

export function* getTrackInfoFunction(action) {
  if (action.songDetails) {
    yield put(successGetSongDetails(action.songDetails));
  } else {
    const response = yield call(getSongDetails, action.songId);
    const { ok, data } = response;
    if (ok) {
      yield put(successGetSongDetails(data.results[0]));
    } else {
      yield put(errorGetSongDetails(data));
    }
  }
}

export default function* trackInfoSaga() {
  yield takeLatest(REQUEST_GET_SONG_DETAILS, getTrackInfoFunction);
}
