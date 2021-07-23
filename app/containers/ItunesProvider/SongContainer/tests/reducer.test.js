// import produce from 'immer'
import { songContainerReducer, songContainerTypes, initialState } from '../../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('SongContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(songContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type REQUEST_GET_SONGS is dispatched', () => {
    const query = 'Mohammed Ali Chherawalla';

    const expectedResult = { ...state, query: query, loading: true };

    expect(
      songContainerReducer(state, {
        type: songContainerTypes.REQUEST_GET_SONGS,
        query: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and loading = false when SUCCESS_GET_SONGS is dispatched', () => {
    const data = { query: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, songsData: data, loading: false };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.SUCCESS_GET_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the error has some data and loading = false when FAILURE_GET_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error, loading: false };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that the songsData has no data and loading = false when CLEAR_SONGS is dispatched', () => {
    const expectedResult = { ...state, songsData: [], loading: false };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.CLEAR_SONGS
      })
    ).toEqual(expectedResult);
  });
});
