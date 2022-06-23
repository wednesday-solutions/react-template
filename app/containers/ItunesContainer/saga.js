import { takeLatest } from 'redux-saga/effects';
import { itunesContainerTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = itunesContainerTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* itunesContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
