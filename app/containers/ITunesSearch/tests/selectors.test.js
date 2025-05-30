import { selectTracks, selectLoading, selectError, selectQuery } from '../selectors';
import { initialState } from '../reducer';

describe('ITunesSearch selectors', () => {
  it('should select the tracks', () => {
    const tracks = [{ id: 1, name: 'Track 1' }];
    const mockedState = {
      itunesSearch: {
        ...initialState,
        tracks
      }
    };
    expect(selectTracks(mockedState)).toEqual(tracks);
  });

  it('should select the loading state', () => {
    const mockedState = {
      itunesSearch: {
        ...initialState,
        loading: true
      }
    };
    expect(selectLoading(mockedState)).toEqual(true);
  });

  it('should select the error', () => {
    const error = new Error('Test error');
    const mockedState = {
      itunesSearch: {
        ...initialState,
        error
      }
    };
    expect(selectError(mockedState)).toEqual(error);
  });

  it('should select the query', () => {
    const query = 'test query';
    const mockedState = {
      itunesSearch: {
        ...initialState,
        query
      }
    };
    expect(selectQuery(mockedState)).toEqual(query);
  });

  it('should select initial state when state is empty', () => {
    const emptyState = {};
    expect(selectTracks(emptyState)).toEqual(initialState.tracks);
    expect(selectLoading(emptyState)).toEqual(initialState.loading);
    expect(selectError(emptyState)).toEqual(initialState.error);
    expect(selectQuery(emptyState)).toEqual(initialState.query);
  });
});
