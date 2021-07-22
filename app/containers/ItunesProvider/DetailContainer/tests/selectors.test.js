import { selectSongContainer, selectTrackData, selectTrackError } from '../../selectors';

describe('DetailContainer selector tests', () => {
  let mockedState;
  let trackData;
  let trackError;

  beforeEach(() => {
    trackData = { resultCount: 1, results: [{ trackId: 1 }] };
    trackError = 'There was some error while fetching the track details';

    mockedState = {
      songContainer: {
        trackData,
        trackError
      }
    };
  });
  it('should select the songsContainer state', () => {
    const songContainerSelector = selectSongContainer();
    expect(songContainerSelector(mockedState)).toEqual(mockedState.songContainer);
  });
  it('should select songsData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackData);
  });

  it('should select the Error', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });
});
