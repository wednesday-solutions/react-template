/**
 * Test iTunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import iTunesSaga, { defaultFunction } from '../saga';
import { iTunesTypes } from '../reducer';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.DEFAULT_ACTION, defaultFunction));
  });
});
