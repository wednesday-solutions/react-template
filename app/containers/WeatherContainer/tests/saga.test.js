/**
 * Test weatherContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import weatherContainerSaga, { defaultFunction } from '../saga';
import { weatherContainerTypes } from '../reducer';

describe('WeatherContainer saga tests', () => {
  const generator = weatherContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(weatherContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
