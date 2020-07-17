import {
  selectITunesContainer,
  selectITuneName,
  selectITunesData,
  selectITunesError,
  selectCurrentTune,
  selectSelectedTune,
  selectTuneData,
  selectTuneError
} from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;
  let iTuneName;
  let iTunesData;
  let iTunesError;
  let currentTune;
  let selectedTune;
  let tuneData;
  let tuneError;
  const trackName = 'perfect';
  beforeEach(() => {
    iTuneName = 'perfect';
    iTunesData = { resultCount: 1, results: [{ iTuneName }] };
    iTunesError = 'There was some error while fetching the iTunes';
    currentTune = { trackName };
    selectedTune = { trackName };
    tuneData = { trackName };
    tuneError = 'There was some error while fetching the iTunes';
    mockedState = {
      iTuneContainer: {
        iTuneName,
        iTunesData,
        iTunesError,
        currentTune,
        selectedTune,
        tuneData,
        tuneError
      }
    };
  });
  it('should select the iTuneContainer state', () => {
    const iTunesContainerSelector = selectITunesContainer();
    expect(iTunesContainerSelector(mockedState)).toEqual(mockedState.iTuneContainer);
  });
  it('should select the iTuneName', () => {
    const iTuneSelector = selectITuneName();
    expect(iTuneSelector(mockedState)).toEqual(iTuneName);
  });

  it('should select iTunesData', () => {
    const iTunesDataSelector = selectITunesData();
    expect(iTunesDataSelector(mockedState)).toEqual(iTunesData);
  });

  it('should select the iTunesError', () => {
    const iTunesErrorSelector = selectITunesError();
    expect(iTunesErrorSelector(mockedState)).toEqual(iTunesError);
  });

  it('should select the currentTune', () => {
    const currentTuneSelector = selectCurrentTune();
    expect(currentTuneSelector(mockedState)).toEqual(currentTune);
  });

  it('should select the selectedTune', () => {
    const selectedTuneSelector = selectSelectedTune();
    expect(selectedTuneSelector(mockedState)).toEqual(selectedTune);
  });

  it('should select the tuneData', () => {
    const tuneDataSelector = selectTuneData();
    expect(tuneDataSelector(mockedState)).toEqual(tuneData);
  });

  it('should select the tuneError', () => {
    const tuneErrorSelector = selectTuneError();
    expect(tuneErrorSelector(mockedState)).toEqual(tuneError);
  });
});
