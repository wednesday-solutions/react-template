import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesAppContainerTypes, itunesAppContainerCreators } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;
const { setLoader, successGetSongs, failureGetSongs } = itunesAppContainerCreators;

export function* requestSearchSong(action) {
  yield put(setLoader(true));
  const response = yield call(getSongsApi, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data.results, false, false));
  } else {
    yield put(failureGetSongs(true));
  }
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
