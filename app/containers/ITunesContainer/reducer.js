/*
 *
 * ITunesContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';

export const initialState = fromJS({});

export const { Types: iTunesContainerTypes, Creators: iTunesContainerCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const iTunesContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case iTunesContainerTypes.DEFAULT_ACTION:
        return state.set('somePayload', action.somePayload);
      default:
        return state;
    }
  });

export default iTunesContainerReducer;
