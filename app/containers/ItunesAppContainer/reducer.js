/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  songsData: [],
  showLoader: false,
  showError: false,
  selectedSong: null,
  playingSong: null
};

export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  setSongs: ['songs'],
  requestSearchSong: ['artistName'],
  setLoader: ['bool'],
  setError: ['bool'],
  setSelectedSong: ['song'],
  setPlayingSong: ['song'],
  successGetSongs: ['songsData', 'showLoader', 'showError'],
  failureGetSongs: ['showError']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesAppContainerTypes.SET_SONGS:
        draft.songsData = action.songs;
        break;

      case itunesAppContainerTypes.SET_LOADER:
        draft.showLoader = action.bool;
        break;

      case itunesAppContainerTypes.SET_ERROR:
        draft.showError = action.bool;
        break;

      case itunesAppContainerTypes.SET_SELECTED_SONG:
        draft.selectedSong = action.song;
        break;

      case itunesAppContainerTypes.SET_PLAYING_SONG:
        draft.playingSong = action.song;
        break;
      case itunesAppContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.songsData;
        draft.showLoader = action.showLoader;
        draft.showError = action.showError;
        break;
      case itunesAppContainerTypes.FAILURE_GET_SONGS:
        draft.showError = action.showError;
        draft.songsData = null;
        draft.showLoader = false;
        break;
      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
