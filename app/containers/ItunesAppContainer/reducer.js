/*
 *
 * ItunesAppContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';

export const initialState = fromJS({});

export const { Types: itunesAppContainerTypes, Creators: itunesAppContainerCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesAppContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case itunesAppContainerTypes.DEFAULT_ACTION:
        return state.set('somePayload', action.somePayload);
      default:
        return state;
    }
  });

export default itunesAppContainerReducer;
