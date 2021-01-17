/*
 *
 * FrontendContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
export const initialState = { dashName: null, dashData: {}, dashError: null };

export const { Types: frontendContainerTypes, Creators: frontendContainerCreators } = createActions({
  requestGetDashboard: ['dashName'],
  successGetDashboard: ['dashData'],
  failureGetDashboard: ['dashError']
});

/* eslint-disable default-case, no-param-reassign */
export const frontendContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case frontendContainerTypes.REQUEST_GET_DASHBOARD:
        draft.dashName = action.dashName;
        break;
      case frontendContainerTypes.SUCCESS_GET_DASHBOARD:
        draft.dashData = action.dashData;
        draft.dashError = null;
        break;
      case frontendContainerTypes.FAILURE_GET_DASHBOARD:
        draft.dashError = action.dashError;
        draft.dashData = {};
        break;
    }
  });

export default frontendContainerReducer;
