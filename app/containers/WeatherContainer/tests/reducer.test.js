// import produce from 'immer'
import { weatherContainerReducer, weatherContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('WeatherContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(weatherContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const cityName = 'Jaipur';
    const expectedResult = { ...state, cityName };
    expect(
      weatherContainerReducer(state, {
        type: weatherContainerTypes.REQUEST_GET_CITY_WEATHER,
        cityName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Jaipur' };
    const expectedResult = { ...state, cityData: data };
    expect(
      weatherContainerReducer(state, {
        type: weatherContainerTypes.SUCCESS_GET_CITY_WEATHER,
        cityData: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, cityError: error };
    expect(
      weatherContainerReducer(state, {
        type: weatherContainerTypes.FAILURE_GET_CITY_WEATHER,
        cityError: error
      })
    ).toEqual(expectedResult);
  });
});
