/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: songContainerTypes, Creators: songContainerCreators } = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});
export const initialState = { query: null, songsData: [], songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const songContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case songContainerTypes.REQUEST_GET_SONGS:
        draft.query = action.query;
        break;
      case songContainerTypes.CLEAR_SONGS:
        return initialState;
      case songContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.data;
        break;
      case songContainerTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default songContainerReducer;
