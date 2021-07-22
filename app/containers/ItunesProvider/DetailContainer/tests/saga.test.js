/**
 * Test detailContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { songContainerSaga, getTrackResults } from '../../saga';
import { getTrack } from '@services/songApi';
import { apiResponseGenerator } from '@utils/testUtils';
import { songContainerTypes } from '../../reducer';

describe('DetailContainer saga tests', () => {
  const trackId = 1;
  const generator = songContainerSaga();

  it('should start task to watch for REQUEST_GET_TRACK action', () => {
    generator.next();
    expect(generator.next().value).toEqual(takeLatest(songContainerTypes.REQUEST_GET_TRACK, getTrackResults));
  });
  it('should ensure that the action FAILURE_GET_TRACK is dispatched when the api call fails', () => {
    const getTrackResults = require('../../saga').getTrackResults;
    const getTrackGenerator = getTrackResults({ id: 1 });
    getTrackGenerator.next({ results: [{ trackId: 1 }] });
    const res = getTrackGenerator.next().value;
    expect(res).toEqual(call(getTrack, trackId));
    const errorResponse = {
      error: 'There was an error while fetching song information.'
    };
    expect(getTrackGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: songContainerTypes.FAILURE_GET_TRACK,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK is dispatched when the api call succeeds', () => {
    const getTrackResults = require('../../saga').getTrackResults;
    const getTrackGenerator = getTrackResults({ id: 1 });
    getTrackGenerator.next({ results: [{ trackId: 1 }] });
    const res = getTrackGenerator.next().value;
    expect(res).toEqual(call(getTrack, trackId));
    const songsResponse = {
      results: [{ trackId }]
    };

    const result = getTrackGenerator.next(apiResponseGenerator(true, songsResponse)).value;
    expect(result).toEqual(
      put({
        type: songContainerTypes.SUCCESS_GET_TRACK,
        data: { trackId }
      })
    );
  });
});
