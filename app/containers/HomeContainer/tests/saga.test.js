/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtistData } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getArtistDatas } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const artistName = 'mac';
  let getArtistDatasGenerator = getArtistDatas({ artistName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_SONGS, getArtistDatas));
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getArtistDatasGenerator.next().value;
    expect(res).toEqual(call(getArtistData, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getArtistDatasGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getArtistDatasGenerator = getArtistDatas({ artistName });
    const res = getArtistDatasGenerator.next().value;
    expect(res).toEqual(call(getArtistData, artistName));
    const reposResponse = {
      resultCount: 1,
      results: [{ artistName: artistName }]
    };
    expect(getArtistDatasGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        data: reposResponse
      })
    );
  });
});
