import { selectHomeContainer, selectArtistName, selectItunesData, selectItunesError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let artistName;
  let itunesData;
  let itunesError;

  beforeEach(() => {
    artistName = 'mac';
    itunesData = { resultCount: 1, items: [{ artistName }] };
    itunesError = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: {
        artistName,
        itunesData,
        itunesError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the artistName', () => {
    const repoSelector = selectArtistName();
    expect(repoSelector(mockedState)).toEqual(artistName);
  });

  it('should select itunesData', () => {
    const itunesDataSelector = selectItunesData();
    expect(itunesDataSelector(mockedState)).toEqual(itunesData);
  });

  it('should select the itunesError', () => {
    const itunesErrorSelector = selectItunesError();
    expect(itunesErrorSelector(mockedState)).toEqual(itunesError);
  });
});
