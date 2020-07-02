/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

export const initialState = fromJS({ songsData: [], showLoader: false });

export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  setSongs: ['songs'],
  requestSearchSong: ['artistName'],
  setLoader: ['bool']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesAppContainerTypes.SET_SONGS:
        return state.set('songsData', action.songs);
      case itunesAppContainerTypes.SET_LOADER:
        return state.set('showLoader', action.bool);
      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
