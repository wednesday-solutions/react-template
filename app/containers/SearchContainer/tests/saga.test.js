/**
 * Test searchContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import searchContainerSaga, { defaultFunction } from '../saga';
import { searchContainerTypes } from '../reducer';

describe('SearchContainer saga tests', () => {
  const generator = searchContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
