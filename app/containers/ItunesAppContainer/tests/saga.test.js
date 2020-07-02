/**
 * Test itunesAppContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import itunesAppContainerSaga, { defaultFunction } from '../saga';
import { itunesAppContainerTypes } from '../reducer';

describe('ItunesAppContainer saga tests', () => {
  const generator = itunesAppContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesAppContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
