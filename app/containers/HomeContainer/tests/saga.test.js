import { call, put, takeLatest } from 'redux-saga/effects';
import homeContainerSaga, { asyncGetSong } from '../saga';
import { homeContainerTypes } from '../reducer';
import { getSongs } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const songName = 'eminem';
  let asyncGetSongGenerator = asyncGetSong({ songName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_SONGS, asyncGetSong));
  });
  it('should ensure that FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = asyncGetSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song information'
    };
    expect(asyncGetSongGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });
  it('should ensure that SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    asyncGetSongGenerator = asyncGetSong({ songName });
    const res = asyncGetSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
  });
});
