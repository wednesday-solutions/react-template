import { put, call, takeLatest } from 'redux-saga/effects';
import { getTracks } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_TRACKS } = homeContainerTypes;
const { successGetTracks, failureGetTracks } = homeContainerCreators;

export function* getItunesResults(action) {
  const response = yield call(getTracks, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTracks(data));
  } else {
    yield put(failureGetTracks(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getItunesResults);
}
