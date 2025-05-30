import { put, call, delay } from 'redux-saga/effects';
import { searchTracksSaga } from '../saga';
import { searchTracksSuccess, searchTracksError } from '../actions';
import { searchTracks } from '@app/services/itunesApi';

describe('searchTracksSaga', () => {
  const query = 'test';
  const generator = searchTracksSaga({ query });

  it('should delay to debounce user input', () => {
    expect(generator.next().value).toEqual(delay(300));
  });

  it('should call the API', () => {
    expect(generator.next().value).toEqual(
      call(searchTracks, query)
    );
  });

  it('should put success action for successful API call', () => {
    const response = {
      ok: true,
      data: {
        results: ['track1', 'track2']
      }
    };
    expect(generator.next(response).value).toEqual(
      put(searchTracksSuccess(response.data.results))
    );
  });

  it('should put error action for failed API call', () => {
    const newGenerator = searchTracksSaga({ query });
    newGenerator.next(); // delay
    newGenerator.next(); // api call

    const response = {
      ok: false,
      data: {
        message: 'API Error'
      }
    };

    expect(newGenerator.next(response).value).toEqual(
      put(searchTracksError(new Error('API Error')))
    );
  });

  it('should handle errors', () => {
    const newGenerator = searchTracksSaga({ query });
    newGenerator.next(); // delay
    newGenerator.next(); // api call

    const error = new Error('Test error');
    expect(newGenerator.throw(error).value).toEqual(
      put(searchTracksError(error))
    );
  });
});
