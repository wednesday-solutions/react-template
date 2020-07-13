/**
 * Test iTunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import iTunesContainerSaga, { defaultFunction } from '../saga';
import { iTunesContainerTypes } from '../reducer';

describe('ITunesContainer saga tests', () => {
  const generator = iTunesContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
