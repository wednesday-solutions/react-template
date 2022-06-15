/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { createActions } from 'reduxsauce';

export const initialState = { songs: [], error: null };

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  requestGetSongs: ['searchTerm'],
  successGetSongs: ['data'],
  errorGetSongs: ['error'],
  clearSongs: null
});

/* eslint-disable default-case, no-param-reassign */
export const iTunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesTypes.SUCCESS_GET_SONGS:
        draft.songs = action.data;
        break;
      case iTunesTypes.ERROR_GET_SONGS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case iTunesTypes.CLEAR_SONGS:
        draft.searchTerm = null;
        draft.error = null;
        draft.songs = [];
        break;
      default:
        return state;
    }
  });

export default iTunesReducer;
