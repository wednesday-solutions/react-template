/**
 * Test HomeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import homeContainerSaga, { defaultFunction } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
