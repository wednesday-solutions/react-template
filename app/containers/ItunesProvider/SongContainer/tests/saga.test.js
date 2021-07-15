/**
 * Test songContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import songContainerSaga, { defaultFunction } from '../saga';
import { songContainerTypes } from '../reducer';

describe('SongContainer saga tests', () => {
  const generator = songContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(songContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
