/**
 * Test frontendContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getDash } from '@app/services/cityApi';
import { apiResponseGenerator } from '@utils/testUtils';
import frontendContainerSaga, { getDashboard } from '../saga';
import { frontendContainerTypes } from '../reducer';

describe('FrontendContainer saga tests', () => {
  const generator = frontendContainerSaga();
  const dashName = 'Phoenix';
  let getDashboardGenerator = getDashboard({ dashName });
  it('should start task to watch for REQUEST_GET_DASHBOARD action', () => {
    expect(generator.next().value).toEqual(takeLatest(frontendContainerTypes.REQUEST_GET_DASHBOARD, getDashboard));
  });
  it('should ensure that the action FAILURE_GET_DASHBOARD is dispatched when the api call fails', () => {
    const dash = getDashboardGenerator.next().value;
    expect(dash).toEqual(call(getDash, dashName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching weather informations.'
    };
    expect(getDashboardGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: frontendContainerTypes.FAILURE_GET_DASHBOARD,
        dashError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_DASHBOARD is dispatched when the api call succeeds', () => {
    getDashboardGenerator = getDashboard({ dashName });
    const dash = getDashboardGenerator.next().value;
    expect(dash).toEqual(call(getDash, dashName));
    const dashResponse = { items: [{ dashName: dashName }] };
    expect(getDashboardGenerator.next(apiResponseGenerator(true, dashResponse)).value).toEqual(
      put({
        type: frontendContainerTypes.SUCCESS_GET_DASHBOARD,
        dashData: dashResponse
      })
    );
  });
});
