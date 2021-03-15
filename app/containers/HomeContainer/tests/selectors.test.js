import { selectHomeContainer, selectArtistName, selectArtistData, selectArtistSearchError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let artistName;
  let artistData;
  let artistSearchError;

  beforeEach(() => {
    artistName = 'mac';
    artistData = { resultCount: 1, results: [{ artistName }] };
    artistSearchError = 'There was some error while fetching the artist details';

    mockedState = {
      homeContainer: {
        artistName,
        artistData,
        artistSearchError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the repoName', () => {
    const artistSelector = selectArtistName();
    expect(artistSelector(mockedState)).toEqual(artistName);
  });

  it('should select reposData', () => {
    const artistDataSelector = selectArtistData();
    expect(artistDataSelector(mockedState)).toEqual(artistData);
  });

  it('should select the reposError', () => {
    const artistErrorSelector = selectArtistSearchError();
    expect(artistErrorSelector(mockedState)).toEqual(artistSearchError);
  });
});
