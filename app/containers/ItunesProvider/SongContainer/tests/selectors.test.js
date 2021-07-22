import { selectSongContainer, selectSongsData, selectQuery, selectSongsError } from '../../selectors';

describe('SongContainer selector tests', () => {
  let mockedState;
  let query;
  let songsData;
  let songsError;

  beforeEach(() => {
    query = 'song';
    songsData = { resultCount: 1, results: [{ query }] };
    songsError = 'There was some error while fetching the song details';

    mockedState = {
      songContainer: {
        query,
        songsData,
        songsError
      }
    };
  });
  it('should select the songsContainer state', () => {
    const songContainerSelector = selectSongContainer();
    expect(songContainerSelector(mockedState)).toEqual(mockedState.songContainer);
  });
  it('should select query', () => {
    const querySelector = selectQuery();
    expect(querySelector(mockedState)).toEqual(query);
  });
  it('should select songsData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });
});
