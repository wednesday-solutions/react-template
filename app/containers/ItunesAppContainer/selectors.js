import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesAppContainer state domain
 */

const selectItunesAppContainerDomain = state => state.itunesAppContainer || initialState;

const makeSelectItunesAppContainer = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => substate
  );

export default makeSelectItunesAppContainer;
export { selectItunesAppContainerDomain };
