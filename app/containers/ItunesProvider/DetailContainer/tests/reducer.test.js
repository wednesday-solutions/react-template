// import produce from 'immer'
import { fromJS } from 'immutable';
import { detailContainerReducer, detailContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('DetailContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(detailContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      detailContainerReducer(state, {
        type: detailContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
