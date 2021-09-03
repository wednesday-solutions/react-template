import { homeContainerReducer, iTunesServiceInitialState, homeContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = iTunesServiceInitialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const searchTerm = 'rihana';
    const expectedResult = { ...state, searchTerm };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_TRACKS,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the search data is present and loading = false when SUCCESS_GET_TRACKS is dispatched', () => {
    const data = { name: 'rihana' };
    const expectedResult = { ...state, searchData: data };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the an error message is shown and loading = false when FAILURE_GET_TRACKS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, searchError: error };
    // eslint-disable-next-line no-console
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });
});
