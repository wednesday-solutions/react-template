/*
 *
 * HomeContainer reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: songsContainerTypes, Creators: songsContainerCreators } = createActions({
  requestGetItuneSongs: ['songName'],
  successGetItuneSongs: ['data'],
  failureGetItuneSongs: ['error'],
  clearItuneSongs: {}
});
export const initialState = { songName: null, songsData: {}, songsError: null, loading: null };

export const songsContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case songsContainerTypes.REQUEST_GET_ITUNE_SONGS:
        draft.songName = action.songName;
        draft.loading = true;
        break;
      case songsContainerTypes.CLEAR_ITUNE_SONGS:
        draft.songName = null;
        draft.songsError = null;
        draft.songsData = {};
        draft.loading = null;
        break;
      case songsContainerTypes.SUCCESS_GET_ITUNE_SONGS:
        draft.songsData = action.data;
        draft.songsError = null;
        draft.loading = false;
        break;
      case songsContainerTypes.FAILURE_GET_ITUNE_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        draft.songsData = null;
        draft.loading = false;
        break;
    }
  });

export default songsContainerReducer;
