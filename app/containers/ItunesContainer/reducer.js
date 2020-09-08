/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItunesSongs: ['songName'],
  successGetItunesSongs: ['data'],
  failureGetItunesSongs: ['error'],
  clearItunesSongs: []
});
export const initialState = { songName: null, songsData: [], songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ITUNES_SONGS:
        draft.songName = action.songName;
        break;
      case itunesContainerTypes.CLEAR_ITUNES_SONGS:
        return initialState;
      case itunesContainerTypes.SUCCESS_GET_ITUNES_SONGS:
        draft.songsData = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNES_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default itunesContainerReducer;
