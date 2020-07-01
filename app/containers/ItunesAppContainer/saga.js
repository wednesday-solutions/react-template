import { takeLatest } from 'redux-saga/effects';
import { itunesAppContainerTypes } from './reducer';
// Individual exports for testing
const { DEFAULT_ACTION } = itunesAppContainerTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* itunesAppContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
