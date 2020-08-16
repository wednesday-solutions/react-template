import { iTunesContainerReducer, iTunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state when an action of type REQUEST_GET_I_TUNES is dispatched', () => {
    const iTuneName = 'perfect';
    const expectedResult = { ...state, iTuneName };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_I_TUNES,
        iTuneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the tunes data is present  when SUCCESS_GET_I_TUNES is dispatched', () => {
    const data = { trackName: 'perfect' };
    const expectedResult = { ...state, iTunesData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that it returns error message when FAILURE_GET_I_TUNES is dispatched', () => {
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

  it('should return the initial state when an action of type REQUEST_TUNE_BY_ID is dispatched', () => {
    const tuneId = 1193701400;
    const expectedResult = { ...state, tuneId };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_TUNE_BY_ID,
        tuneId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that it returns data when SUCCESS_GET_TUNE_BY_ID is dispatched', () => {
    const data = { trackName: 'perfect' };
    const expectedResult = { ...state, tuneData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_TUNE_BY_ID,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and FAILURE_GET_TUNE_BY_ID is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, tuneError: error };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_TUNE_BY_ID,
        error
      })
    ).toEqual(expectedResult);
  });
});
