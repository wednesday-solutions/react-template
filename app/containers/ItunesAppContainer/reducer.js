/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import {fromJS} from 'immutable'
 
export const initialState = fromJS({songsData:[],showLoader:false})


export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  defaultAction: ['somePayload'],
  setSongs: ['songs'],
  requestSearchSong: ['artistName'],
  setLoader:['bool']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesAppContainerTypes.DEFAULT_ACTION:
        return state.set('somePayload', action.somePayload);
      case itunesAppContainerTypes.SET_SONGS:
           return state.set('songsData',action.songs)
      case  itunesAppContainerTypes.SET_LOADER:
        console.log(action);
        
        return state.set('showLoader',action.bool)

      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
