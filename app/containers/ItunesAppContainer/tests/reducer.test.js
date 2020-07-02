import { fromJS } from 'immutable';

import { itunesAppContainerReducer, itunesAppContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesAppContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesAppContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type SET_SONGS is dispatched', () => {
    const mockSongData = [{ trackName: 'sample track' }];
    const expectedResult = fromJS(state.toJS()).set('songsData', mockSongData);

    expect(
      itunesAppContainerReducer(state, {
        type: itunesAppContainerTypes.SET_SONGS,
        songs: mockSongData
      })
    ).toEqual(expectedResult);
  });

  it('should return update the state when an action of type SET_LOADER dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('showLoader', true);
    expect(itunesAppContainerReducer(state, { type: itunesAppContainerTypes.SET_LOADER, bool: true })).toEqual(
      expectedResult
    );
  });
});
