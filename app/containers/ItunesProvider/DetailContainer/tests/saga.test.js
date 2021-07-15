/**
 * Test detailContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import detailContainerSaga, { defaultFunction } from '../saga';
import { detailContainerTypes } from '../reducer';

describe('DetailContainer saga tests', () => {
  const generator = detailContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(detailContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
