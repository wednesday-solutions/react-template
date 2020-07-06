/**
 * Test itunesAppContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, call } from 'redux-saga/effects';
import itunesAppContainerSaga, { requestSearchSong } from '../saga';
import { itunesAppContainerTypes, itunesAppContainerCreators } from '../reducer';
import { getSongsApi } from '@app/services/ituneSongsApi';

const { setLoader } = itunesAppContainerCreators;

describe('ItunesAppContainer saga tests', () => {
  it('should start task to watch for REQUEST_SEARCH_SONG action', () => {
    const generator = itunesAppContainerSaga();
    expect(generator.next().value).toEqual(takeLatest(itunesAppContainerTypes.REQUEST_SEARCH_SONG, requestSearchSong));
  });

  it('should dispatch action SET_LOADER as true', () => {
    const generator = requestSearchSong();
    expect(generator.next().value).toEqual(put(setLoader(true)));
  });
  it('should call getSongsApi', () => {
    const generator = requestSearchSong({ artistName: 'sample' });
    generator.next();
    expect(generator.next().value).toEqual(call(getSongsApi, 'sample'));
  });
});
