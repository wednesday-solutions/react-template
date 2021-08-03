// import produce from 'immer'
import { searchContainerReducer, searchContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('SearchContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(searchContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...state, somePayload: 'Mohammed Ali Chherawalla' };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
