import { fromJS } from 'immutable';
import { homeContainerReducer, homeContainerTypes, initialState } from '../reducer';

describe('HomeContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return to update the state when an action of type REQUEST_GET_SONGS is dispatched', () => {
    const songName = 'Eminem';
    const expectedResult = { ...state, songName };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });
  it('should return to update the state when an action of type SUCCESS_GET_SONGS is dispatched', () => {
    const songsData = [{ artistName: 'Eminem' }];
    const expectedResult = { ...state, songsData };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        songsData
      })
    ).toEqual(expectedResult);
  });
  it('should return to update the state when an action of type FAILURE_GET_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
