import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesAppContainerTypes, itunesAppContainerCreators } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;
const { setSongs, setLoader } = itunesAppContainerCreators;

export function* requestSearchSong(action) {
  try {
    yield put(setLoader(true));
    const songs = yield call(getSongsApi, action.artistName);
    yield put(setLoader(false));
    yield put(setSongs(songs));
  } catch (err) {
    yield put(setLoader(false));
    yield put(setSongs([]));
  }
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
