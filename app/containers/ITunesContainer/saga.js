import { takeLatest } from 'redux-saga/effects';
import { iTunesContainerTypes } from './reducer';
// Individual exports for testing
const { DEFAULT_ACTION } = iTunesContainerTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* iTunesContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
