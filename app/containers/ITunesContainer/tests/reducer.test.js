// import produce from 'immer'
import { fromJS } from 'immutable';
import { iTunesContainerReducer, iTunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
