import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesAppContainerTypes, itunesAppContainerCreators } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;
const { setLoader, successGetSongs, failureGetSongs } = itunesAppContainerCreators;

export function* requestSearchSong(action) {
  try {
    yield put(setLoader(true));
    const songs = yield call(getSongsApi, action.artistName);
    yield put(successGetSongs(songs, false, false));
  } catch (err) {
    yield put(failureGetSongs(true));
  }
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
