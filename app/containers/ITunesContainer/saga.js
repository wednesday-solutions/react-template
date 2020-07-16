import { put, call, takeLatest } from 'redux-saga/effects';
import { getTunes } from '@services/iTuneApi';
import { iTunesContainerTypes, iTunesContainerCreators } from './reducer';

const { REQUEST_GET_I_TUNES } = iTunesContainerTypes;
const { successGetITunes, failureGetITunes } = iTunesContainerCreators;
export function* getITunes(action) {
  const response = yield call(getTunes, action.iTuneName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetITunes(data));
  } else {
    yield put(failureGetITunes(data));
  }
}

export default function* iTunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES, getITunes);
}
