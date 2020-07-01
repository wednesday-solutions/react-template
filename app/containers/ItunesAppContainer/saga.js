import { takeLatest, call } from 'redux-saga/effects';
import { itunesAppContainerTypes } from './reducer';
import { getSongsApi } from '@services/ituneSongsApi';
const { REQUEST_SEARCH_SONG } = itunesAppContainerTypes;

export function* requestSearchSong(action) {
  yield call(getSongsApi, action.artistName);
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(REQUEST_SEARCH_SONG, requestSearchSong);
}
