import { selectHomeContainer, selectSongName, selectSongsData, selectSongsError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;

  beforeEach(() => {
    songName = 'eminem';
    songsData = [{ artistName: 'eminem' }];
    songsError = 'there was some error';
    mockedState = {
      homeContainer: {
        songName,
        songsData,
        songsError
      }
    };
  });

  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the song name', () => {
    const songNameSelector = selectSongName();
    expect(songNameSelector(mockedState)).toEqual(songName);
  });
  it('should select the songs Data', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });
  it('should select the song error', () => {
    const songErorSelector = selectSongsError();
    expect(songErorSelector(mockedState)).toEqual(songsError);
  });
});
