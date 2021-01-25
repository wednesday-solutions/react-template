import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtistData } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_ARTIST } = homeContainerTypes;
const { successGetArtist, failureGetArtist } = homeContainerCreators;
export function* getArtist(action) {
  const response = yield call(getArtistData, action.artistName);
  // console.log(response);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtist(data));
  } else {
    yield put(failureGetArtist(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTIST, getArtist);
}
