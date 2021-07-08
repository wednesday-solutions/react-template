/*
 *
 * ITunesSearch reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: iTunesSearchTypes, Creators: iTunesSearchCreators } = createActions({
  requestGetTrackNames: ['artistName'],
  successGetTrackNames: ['data'],
  failureGetTrackNames: ['error'],
  clearTrackNames: []
});
export const initialState = { artistName: null, tracks: {}, tracksError: null };

/* eslint-disable default-case, no-param-reassign */
export const iTunesSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case iTunesSearchTypes.REQUEST_GET_TRACK_NAMES:
        draft.artistName = action.artistName;
        break;
      case iTunesSearchTypes.CLEAR_TRACK_NAMES:
        return initialState;
      case iTunesSearchTypes.SUCCESS_GET_TRACK_NAMES:
        draft.tracks = action.data;
        break;
      case iTunesSearchTypes.FAILURE_GET_TRACK_NAMES:
        draft.tracksError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default iTunesSearchReducer;
