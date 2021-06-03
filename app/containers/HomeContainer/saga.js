import { call, put, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/iTunesApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';
const { REQUEST_GET_SONGS } = homeContainerTypes;
const { successGetSongs, failureGetSongs } = homeContainerCreators;

export function* asyncGetSong(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data.results));
  } else {
    yield put(failureGetSongs(data));
  }
}

export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, asyncGetSong);
}
