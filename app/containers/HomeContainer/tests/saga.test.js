/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtistData } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getArtist } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const artistName = 'mac';
  let getArtistGenerator = getArtist({ artistName });

  it('should start task to watch for REQUEST_GET_ARTIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_ARTIST, getArtist));
  });

  it('should ensure that the action FAILURE_GET_ARTIST is dispatched when the api call fails', () => {
    const res = getArtistGenerator.next().value;
    expect(res).toEqual(call(getArtistData, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching artist informations.'
    };
    expect(getArtistGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ARTIST,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ARTIST is dispatched when the api call succeeds', () => {
    getArtistGenerator = getArtist({ artistName });
    const res = getArtistGenerator.next().value;
    expect(res).toEqual(call(getArtistData, artistName));
    const artistResponse = {
      resultCount: 1,
      results: [{ artistName: artistName }]
    };
    expect(getArtistGenerator.next(apiResponseGenerator(true, artistResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ARTIST,
        data: artistResponse
      })
    );
  });
});
