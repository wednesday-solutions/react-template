import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesContainer state domain
 */

const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectSomePayLoad = () => createSelector(selectItunesContainerDomain, (substate) => substate.somePayLoad);
