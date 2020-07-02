import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesAppContainerTypes, itunesAppContainerCreators } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;
const { setSongs, setLoader, setError } = itunesAppContainerCreators;

export function* requestSearchSong(action) {
  try {
    yield put(setLoader(true));
    const songs = yield call(getSongsApi, action.artistName);
    yield put(setLoader(false));
    yield put(setSongs(songs));
  } catch (err) {
    yield put(setError(true));
    yield put(setLoader(false));
    yield put(setSongs(null));
  }
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
