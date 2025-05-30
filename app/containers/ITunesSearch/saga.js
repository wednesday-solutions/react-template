import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { SEARCH_TRACKS } from './constants';
import { searchTracksSuccess, searchTracksError } from './actions';
import { searchTracks as searchTracksApi } from '@app/services/itunesApi';
import { translate } from '@app/utils';

/**
 * Search tracks saga
 * @param {object} action - The action object
 */
export function* searchTracksSaga({ query }) {
  try {
    // Add a small delay to prevent too many API calls while typing
    yield delay(300);

    const response = yield call(searchTracksApi, query);

    if (response.ok) {
      yield put(searchTracksSuccess(response.data.results));
    } else {
      throw new Error(response.data?.message || translate('search_tracks_error'));
    }
  } catch (error) {
    yield put(searchTracksError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* itunesSearchSaga() {
  // Watches for SEARCH_TRACKS actions and calls searchTracksSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  yield takeLatest(SEARCH_TRACKS, searchTracksSaga);
}
