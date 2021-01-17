import { frontendContainerReducer, frontendContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('FrontendContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(frontendContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const dashName = 'Phoenix';
    const expectedResult = { ...state, dashName };
    expect(
      frontendContainerReducer(state, {
        type: frontendContainerTypes.REQUEST_GET_DASHBOARD,
        dashName
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Phoenix' };
    const expectedResult = { ...state, dashData: data };
    expect(
      frontendContainerReducer(state, {
        type: frontendContainerTypes.SUCCESS_GET_DASHBOARD,
        dashData: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, dashError: error };
    expect(
      frontendContainerReducer(state, {
        type: frontendContainerTypes.FAILURE_GET_DASHBOARD,
        dashError: error
      })
    ).toEqual(expectedResult);
  });
});
