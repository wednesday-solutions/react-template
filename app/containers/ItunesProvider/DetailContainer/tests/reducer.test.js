import { songContainerReducer, songContainerTypes, initialState } from '@containers/ItunesProvider/reducer';

/* eslint-disable default-case, no-param-reassign */
describe('DetailContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(songContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type REQUEST_GET_TRACK is dispatched', () => {
    const expectedResult = { ...state, loading: true };

    expect(
      songContainerReducer(state, {
        type: songContainerTypes.REQUEST_GET_TRACK,
        somePayload: 1
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and loading = false when SUCCESS_GET_TRACK is dispatched', () => {
    const data = { trackId: 1 };
    const expectedResult = {
      ...state,

      trackData: data,
      loading: false
    };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.SUCCESS_GET_TRACK,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the error has some data and loading = false when FAILURE_GET_TRACK is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackError: error, loading: false };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.FAILURE_GET_TRACK,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackData has some data and loading = false when CLEAR_TRACK is dispatched', () => {
    const expectedResult = { ...state, trackData: {}, loading: false };
    expect(
      songContainerReducer(state, {
        type: songContainerTypes.CLEAR_TRACK
      })
    ).toEqual(expectedResult);
  });
});
