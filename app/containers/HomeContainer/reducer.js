/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetTracks: ['searchTerm'],
  successGetTracks: ['data'],
  failureGetTracks: ['error'],
  clearTracks: []
});

// the data keys that becomes the props?
export const initialState = { repoName: null, reposData: [], reposError: null };

export const iTunesServiceInitialState = { searchTerm: null, searchData: {}, searchError: null };

export const homeContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case homeContainerTypes.REQUEST_GET_TRACKS:
      draft.searchTerm = action.searchTerm;
      break;

    case homeContainerTypes.SUCCESS_GET_TRACKS:
      draft.searchData = action.data;
      break;

    case homeContainerTypes.FAILURE_GET_TRACKS:
      // handle error better
      draft.searchError = action.error;
      break;

    case homeContainerTypes.CLEAR_TRACKS:
      return iTunesServiceInitialState;

    default:
      break;
  }
}, iTunesServiceInitialState);

export default homeContainerReducer;
