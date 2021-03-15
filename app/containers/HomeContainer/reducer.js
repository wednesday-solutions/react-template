/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetArtist: ['artistName'],
  successGetArtist: ['data'],
  failureGetArtist: ['error'],
  clearArtistSearch: []
});
export const initialState = { artistName: null, artistData: {}, artistSearchError: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_ARTIST:
        draft.artistName = action.artistName;
        break;
      case homeContainerTypes.CLEAR_ARTIST_SEARCH:
        return initialState;
      case homeContainerTypes.SUCCESS_GET_ARTIST:
        draft.artistData = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_ARTIST:
        draft.artistSearchError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
