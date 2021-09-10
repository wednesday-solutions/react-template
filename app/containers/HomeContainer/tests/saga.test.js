/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtists } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItunesData } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const artistName = 'mac';
  let getItunesDataGenerator = getItunesData({ artistName });

  it('should start task to watch for REQUEST_GET_ARTIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_ARTIST, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ARTIST is dispatched when the api call fails', () => {
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getArtists, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ARTIST,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ARTIST is dispatched when the api call succeeds', () => {
    getItunesDataGenerator = getItunesData({ artistName });
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getArtists, artistName));
    const reposResponse = {
      resultCount: 1,
      results: [{ artistName: artistName }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ARTIST,
        data: reposResponse
      })
    );
  });
});
