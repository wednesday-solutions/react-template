import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { iTunesTypes, iTunesCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_SONGS } = iTunesTypes;
const { successGetSongs, errorGetSongs } = iTunesCreators;

export function* getSongsFunction(action) {
  // console.log('Do something here')
  const response = yield call(getSongs, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data?.results || []));
  } else {
    yield put(errorGetSongs(data));
  }
}

export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsFunction);
}
