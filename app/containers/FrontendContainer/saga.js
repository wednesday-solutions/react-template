import { put, call, takeLatest } from 'redux-saga/effects';
import { getDash } from '@app/services/cityApi';

import { frontendContainerTypes, frontendContainerCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_DASHBOARD } = frontendContainerTypes;
const { successGetDashboard, failureGetDashboard } = frontendContainerCreators;
export function* getDashboard(action) {
  const response = yield call(getDash, action.dashName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetDashboard(data));
  } else {
    yield put(failureGetDashboard(data));
  }
}

export default function* frontendContainerSaga() {
  yield takeLatest(REQUEST_GET_DASHBOARD, getDashboard);
}
