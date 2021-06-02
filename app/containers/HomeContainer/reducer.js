/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { songName: null, songsData: {}, error: null };

export const { Types: HomeContainerTypes, Creators: HomeContainerCreators } = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['songsData'],
  failureGetSongs: ['error'],
  clearSongsPlaylist: []
});

/* eslint-disable default-case, no-param-reassign */
export const HomeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HomeContainerTypes.REQUEST_GET_SONGS:
        draft.songName = action.songName;
        break;
      case HomeContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.songsData;
        break;
      case HomeContainerTypes.FAILURE_GET_SONGS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case HomeContainerTypes.CLEAR_SONGS_PLAYLIST:
        return initialState;
      default:
        return state;
    }
  });

export default HomeContainerReducer;
