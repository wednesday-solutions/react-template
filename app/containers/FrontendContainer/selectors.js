import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';
/**
 * Direct selector to the frontendContainer state domain
 */

const selectFrontendContainerDomain = state => state.frontendContainer || initialState;

export const selectFrontendContainer = () =>
  createSelector(
    selectFrontendContainerDomain,
    substate => substate
  );
export const selectDashName = () =>
  createSelector(
    selectFrontendContainerDomain,
    substate => get(substate, 'dashName', null)
  );
export const selectDashData = () =>
  createSelector(
    selectFrontendContainerDomain,
    substate => get(substate, 'dashData', {})
  );

export const selectDashError = () =>
  createSelector(
    selectFrontendContainerDomain,
    substate => get(substate, 'dashError', null)
  );
export default selectFrontendContainer;
