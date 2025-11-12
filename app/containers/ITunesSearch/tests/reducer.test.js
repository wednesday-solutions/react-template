import itunesSearchReducer, { initialState } from '../reducer';
import { searchTracks, searchTracksSuccess, searchTracksError, clearTracks } from '../actions';

describe('itunesSearchReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesSearchReducer(undefined, {})).toEqual(state);
  });

  it('should handle SEARCH_TRACKS', () => {
    const query = 'test';
    const expectedResult = {
      ...state,
      loading: true,
      error: null,
      query
    };

    expect(itunesSearchReducer(state, searchTracks(query))).toEqual(expectedResult);
  });

  it('should handle SEARCH_TRACKS_SUCCESS', () => {
    const tracks = [{ id: 1, name: 'Track 1' }];
    const expectedResult = {
      ...state,
      loading: false,
      tracks
    };

    expect(itunesSearchReducer(state, searchTracksSuccess(tracks))).toEqual(expectedResult);
  });

  it('should handle SEARCH_TRACKS_ERROR', () => {
    const error = new Error('Test error');
    const expectedResult = {
      ...state,
      loading: false,
      error
    };

    expect(itunesSearchReducer(state, searchTracksError(error))).toEqual(expectedResult);
  });

  it('should handle CLEAR_TRACKS', () => {
    const stateWithTracks = {
      ...state,
      tracks: [{ id: 1, name: 'Track 1' }],
      query: 'test',
      error: new Error('Test error')
    };

    expect(itunesSearchReducer(stateWithTracks, clearTracks())).toEqual(initialState);
  });
});
