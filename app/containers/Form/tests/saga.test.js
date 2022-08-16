/**
 * Test form sagas
 */

import { takeLatest } from 'redux-saga/effects';
import formSaga, { defaultFunction } from '../saga';
import { formTypes } from '../reducer';

describe('Form saga tests', () => {
  const generator = formSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(formTypes.DEFAULT_ACTION, defaultFunction));
  });
});
