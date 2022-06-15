// import produce from 'immer'
import { fromJS } from 'immutable';
import { trackInfoReducer, trackInfoTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TrackInfo reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackInfoReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      trackInfoReducer(state, {
        type: trackInfoTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
