/**
 * Test HomeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import HomeContainerSaga, { defaultFunction } from '../saga';
import { HomeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = HomeContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(HomeContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
