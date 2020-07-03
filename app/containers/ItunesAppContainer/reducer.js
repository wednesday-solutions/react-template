/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

export const initialState = fromJS({ songsData: [], showLoader: false, showError: false, selectedSong: null });

export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  setSongs: ['songs'],
  requestSearchSong: ['artistName'],
  setLoader: ['bool'],
  setError: ['bool'],
  setSelectedSong: ['song']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesAppContainerTypes.SET_SONGS:
        return state.set('songsData', action.songs);
      case itunesAppContainerTypes.SET_LOADER:
        return state.set('showLoader', action.bool);
      case itunesAppContainerTypes.SET_ERROR:
        return state.set('showError', action.bool);
      case itunesAppContainerTypes.SET_SELECTED_SONG:
        return state.set('selectedSong', action.song);
      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
