import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtistData } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = homeContainerTypes;
const { successGetSongs, failureGetSongs } = homeContainerCreators;
export function* getArtistDatas(action) {
  const response = yield call(getArtistData, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getArtistDatas);
}
