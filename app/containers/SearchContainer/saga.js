import { takeLatest } from 'redux-saga/effects'
import { searchContainerTypes } from './reducer'
// Individual exports for testing
const { DEFAULT_ACTION } = searchContainerTypes

export function *defaultFunction (/* action */) {
  // console.log('Do something here')

}

export default function* searchContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction)
}