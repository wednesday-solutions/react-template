/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  somePayLoad: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  defaultAction: ['somePayLoad']
});

export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.DEFAULT_ACTION:
        draft.somePayLoad = action.somePayLoad;
        break;
      default:
    }
  });

export default itunesContainerReducer;
