import { itunesAppContainerReducer, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesAppContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesAppContainerReducer(undefined, {})).toEqual(state);
  });
});
