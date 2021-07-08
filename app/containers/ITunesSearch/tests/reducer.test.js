// import produce from 'immer'
import { iTunesSearchReducer, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesSearch reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesSearchReducer(undefined, {})).toEqual(state);
  });
});
