/**
 * Test trackInfo sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import trackInfoSaga, { defaultFunction } from '../saga';
import { trackInfoTypes } from '../reducer';

describe('TrackInfo saga tests', () => {
  const generator = trackInfoSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackInfoTypes.DEFAULT_ACTION, defaultFunction));
  });
});
