/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = { songs: [] };

export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  defaultAction: ['somePayload'],
  setSongs: ['songs'],
  requestSearchSong: ['artistName']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesAppContainerTypes.DEFAULT_ACTION:
        return state.set('somePayload', action.somePayload);
      case itunesAppContainerTypes.SET_SONGS:
        draft.songs = action.songs;
        break;
      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
