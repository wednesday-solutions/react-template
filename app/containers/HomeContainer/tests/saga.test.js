/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTracks } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItunesResults } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const searchTerm = 'rihana';
  // let getGithubReposGenerator = getItunesResGenerator({ searchTerm });
  let getItunesResGenerator = getItunesResults({ searchTerm });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_TRACKS, getItunesResults));
  });

  it('should ensure that the action FAILURE_GET_TRACKS is dispatched when the api call fails', () => {
    const res = getItunesResGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getItunesResGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACKS is dispatched when the api call succeeds', () => {
    // DRYed?
    getItunesResGenerator = getItunesResults({ searchTerm });
    const res = getItunesResGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const reposResponse = {
      resultCount: 1,
      results: [{ trackInfo: searchTerm }]
    };
    expect(getItunesResGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_TRACKS,
        data: reposResponse
      })
    );
  });
});
