/*
 *
 * SearchContainer reducer
 *
 */
import produce from 'immer'
import { createActions } from 'reduxsauce'

export const initialState = {}

export const { Types: searchContainerTypes, Creators: searchContainerCreators } = createActions({
  requestGetArtistSongs: ['songName'],
  successGetArtistSongs: ['data'],
  failureGetArtistSongs: ['error'],
  clearArtistSongs: []
})

/* eslint-disable default-case, no-param-reassign */
export const searchContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case searchContainerTypes.DEFAULT_ACTION:
        return {...state, somePayload: action.somePayload}
      default:
        return state
    }
  })

export default searchContainerReducer
