// import produce from 'immer'
import { fromJS } from 'immutable';
import { iTunesReducer, iTunesTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunes reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      iTunesReducer(state, {
        type: iTunesTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
