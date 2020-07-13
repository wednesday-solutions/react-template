import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesContainer state domain
 */

const selectITunesContainerDomain = state => (state.iTunesContainer || initialState).toJS();

const makeSelectITunesContainer = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => substate
  );

export default makeSelectITunesContainer;
export { selectITunesContainerDomain };
