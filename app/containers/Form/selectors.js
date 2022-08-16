import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the form state domain
 */

const selectFormDomain = (state) => state.form || initialState;

export const selectForm = () => createSelector(selectFormDomain, (substate) => substate);

export const selectUserdata = () => createSelector(selectFormDomain, (substate) => substate.userData);
