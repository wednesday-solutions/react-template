import { takeLatest, call,put } from 'redux-saga/effects';
import { itunesAppContainerTypes, itunesAppContainerCreators } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;
const {setSongs,setLoader}=itunesAppContainerCreators

export function* requestSearchSong(action) {
  yield put(setLoader(true))
  const songs=yield call(getSongsApi, action.artistName);
  yield put(setLoader(false))
  yield put(setSongs(songs))
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
