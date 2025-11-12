import produce from 'immer';
import { SEARCH_TRACKS, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR, CLEAR_TRACKS } from './constants';

export const initialState = {
  tracks: [],
  loading: false,
  error: null,
  query: ''
};

/**
 * iTunes search reducer
 * @param {object} state - The current state
 * @param {object} action - The action to handle
 * @returns {object} The new state
 */
const itunesSearchReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SEARCH_TRACKS:
        draft.loading = true;
        draft.error = null;
        draft.query = action.query;
        break;

      case SEARCH_TRACKS_SUCCESS:
        draft.tracks = action.tracks;
        draft.loading = false;
        break;

      case SEARCH_TRACKS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CLEAR_TRACKS:
        draft.tracks = [];
        draft.error = null;
        draft.query = '';
        break;
    }
  });

export default itunesSearchReducer;
