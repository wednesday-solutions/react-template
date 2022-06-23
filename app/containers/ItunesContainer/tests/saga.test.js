/**
 * Test itunesContainer sagas
 */

import { takeLatest } from 'redux-saga/effects';
import itunesContainerSaga, { defaultFunction } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
