import { get, isEmpty } from 'lodash';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSongs, getTrack } from '@services/songApi';
import { songContainerTypes, songContainerCreators } from './reducer';
import { selectSongsData } from '@containers/ItunesProvider/selectors';

const { REQUEST_GET_SONGS, REQUEST_GET_TRACK } = songContainerTypes;
const { successGetSongs, successGetTrack, failureGetTrack, failureGetSongs } = songContainerCreators;

export function* getSongResults(action) {
  const response = yield call(getSongs, action.query);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}

export function* getTrackResults(action) {
  const tracksData = yield select(selectSongsData());
  const track = get(tracksData, 'results')?.filter(obj => {
    return obj.trackId == action.id;
  })[0];

  if (!isEmpty(track)) {
    yield put(successGetTrack(track));
  } else {
    const response = yield call(getTrack, action.id);
    const { data, ok } = response;
    if (ok) {
      const track = get(data, 'results')[0];

      yield put(successGetTrack(track));
    } else {
      yield put(failureGetTrack(data));
    }
  }
}
// Individual exports for testing
export function* songContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongResults);
  yield takeLatest(REQUEST_GET_TRACK, getTrackResults);
}
