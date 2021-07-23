/**
 * Test songContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { apiResponseGenerator } from '@utils/testUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { songContainerSaga, getSongResults } from '@containers/ItunesProvider/saga';
import { songContainerTypes } from '@containers/ItunesProvider/reducer';
import { getSongs } from '@services/songApi';

describe('SongContainer saga tests', () => {
  const generator = songContainerSaga();
  let query = 'song';
  let getSongResultsGenerator = getSongResults({ query });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(songContainerTypes.REQUEST_GET_SONGS, getSongResults));
  });

  it('should make an api call using getSongs when invoked', () => {
    const res = getSongResultsGenerator.next().value;
    expect(res).toEqual(call(getSongs, query));
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    getSongResultsGenerator = getSongResults({ query });
    const res = getSongResultsGenerator.next().value;
    expect(res).toEqual(call(getSongs, query));
    const error = {
      error: 'There was an error while fetching song informations.'
    };
    expect(getSongResultsGenerator.next(apiResponseGenerator(false, error)).value).toEqual(
      put({
        type: songContainerTypes.FAILURE_GET_SONGS,
        error: error
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getSongResultsGenerator = getSongResults({ query });
    const res = getSongResultsGenerator.next().value;
    expect(res).toEqual(call(getSongs, query));
    const songResponse = {
      totalCount: 1,
      items: [{ trackName: query }]
    };
    expect(getSongResultsGenerator.next(apiResponseGenerator(true, songResponse)).value).toEqual(
      put({
        type: songContainerTypes.SUCCESS_GET_SONGS,
        data: songResponse
      })
    );
  });
});
