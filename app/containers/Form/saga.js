import { takeLatest } from 'redux-saga/effects';
import { formTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = formTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* formSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
