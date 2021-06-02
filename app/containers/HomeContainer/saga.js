import { call, put, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/iTunesApi';
import { HomeContainerTypes, HomeContainerCreators } from './reducer';
const { REQUEST_GET_SONGS } = HomeContainerTypes;
const { successGetSongs, failureGetSongs } = HomeContainerCreators;

export function* defaultFunction(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}

export default function* HomeContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, defaultFunction);
}
