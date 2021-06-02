// import produce from 'immer'
import { fromJS } from 'immutable';
import { homeContainerReducer, homeContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomeContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
