/*
 *
 * TrackInfo reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { createActions } from 'reduxsauce';

export const initialState = { songDetails: {}, error: null };

export const { Types: trackInfoTypes, Creators: trackInfoCreators } = createActions({
  requestGetSongDetails: ['songId', 'songDetails'],
  successGetSongDetails: ['data'],
  errorGetSongDetails: ['error'],
  clearSongDetails: {}
});

/* eslint-disable default-case, no-param-reassign */
export const trackInfoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackInfoTypes.SUCCESS_GET_SONG_DETAILS:
        draft.songDetails = action.data;
        break;
      case trackInfoTypes.ERROR_GET_SONG_DETAILS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case trackInfoTypes.CLEAR_SONG_DETAILS:
        draft.error = null;
        draft.songDetails = {};
        break;
      default:
        return state;
    }
  });

export default trackInfoReducer;
