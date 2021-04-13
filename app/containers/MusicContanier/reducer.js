/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: musicsContainerTypes, Creators: musicsContainerCreators } = createActions({
  requestGetItunesMusics: ['searchTerm'],
  successGetItunesMusics: ['musics'],
  failureGetItunesMusics: ['error'],
  clearItunesMusics: []
});

export const initialState = {
  searchTerm: null,
  musics: {},
  musicsError: null
};

/* eslint-disable default-case, no-param-reassign */
export const musicContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case musicsContainerTypes.REQUEST_GET_ITUNES_MUSICS:
        draft.searchTerm = action.searchTerm;
        break;

      case musicsContainerTypes.CLEAR_ITUNES_MUSICS:
        return initialState;

      case musicsContainerTypes.SUCCESS_GET_ITUNES_MUSICS:
        draft.musics = action.musics;
        break;

      case musicsContainerTypes.FAILURE_GET_ITUNES_MUSICS:
        draft.musicsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default musicContainerReducer;
