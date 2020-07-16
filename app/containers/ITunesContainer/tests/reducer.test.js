import { iTunesContainerReducer, iTunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const iTuneName = 'perfect';
    const expectedResult = { ...state, iTuneName };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_I_TUNES,
        iTuneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { trackName: 'perfect' };
    const expectedResult = { ...state, iTunesData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, iTunesError: error };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_I_TUNES,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the currentTune when SET_CURRENT_TUNE is dispatched', () => {
    const tune = { trackName: 'perfect' };
    const expectedResult = { ...state, currentTune: tune };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SET_CURRENT_TUNE,
        tune
      })
    ).toEqual(expectedResult);
  });

  it('should return the selectedTune when SET_SELECTED_TUNE is dispatched', () => {
    const selectedTune = { trackName: 'perfect' };
    const expectedResult = { ...state, selectedTune };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SET_SELECTED_TUNE,
        selectedTune
      })
    ).toEqual(expectedResult);
  });
});
