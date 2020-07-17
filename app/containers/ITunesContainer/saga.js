import { put, call, takeLatest } from 'redux-saga/effects';
import { getTunes } from '@services/iTuneApi';
import { iTunesContainerTypes, iTunesContainerCreators } from './reducer';

const { REQUEST_GET_I_TUNES, REQUEST_TUNE_BY_ID } = iTunesContainerTypes;
const { successGetITunes, failureGetITunes, successGetTuneById, failureGetTuneById } = iTunesContainerCreators;
export function* getITunes(action) {
  const response = yield call(getTunes, action.iTuneName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetITunes(data));
  } else {
    yield put(failureGetITunes(data));
  }
}

export function* getTuneById(action) {
  const response = yield call(getTunes, action.tuneId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTuneById(data));
  } else {
    yield put(failureGetTuneById(data));
  }
}

export default function* iTunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES, getITunes);
  yield takeLatest(REQUEST_TUNE_BY_ID, getTuneById);
}
