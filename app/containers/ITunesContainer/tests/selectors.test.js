import { selectITunesContainer, selectITuneName, selectITunesData, selectITunesError } from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;
  let iTuneName;
  let iTunesData;
  let iTunesError;

  beforeEach(() => {
    iTuneName = 'perfect';
    iTunesData = { resultCount: 1, results: [{ iTuneName }] };
    iTunesError = 'There was some error while fetching the iTunes';

    mockedState = {
      iTuneContainer: {
        iTuneName,
        iTunesData,
        iTunesError
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
});
