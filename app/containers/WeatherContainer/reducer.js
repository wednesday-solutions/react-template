/*
 *
 * WeatherContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: weatherContainerTypes, Creators: weatherContainerCreators } = createActions({
  requestGetCityWeather: ['cityName'],
  successGetCityWeather: ['cityData'],
  failureGetCityWeather: ['cityError']
});
export const initialState = { cityName: null, cityData: {}, cityError: null };

/* eslint-disable default-case, no-param-reassign */
export const weatherContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case weatherContainerTypes.REQUEST_GET_CITY_WEATHER:
        // return state.set('somePayload', action.somePayload)
        draft.cityName = action.cityName;
        break;
      case weatherContainerTypes.SUCCESS_GET_CITY_WEATHER:
        draft.cityData = action.cityData;
        break;
      case weatherContainerTypes.FAILURE_GET_CITY_WEATHER:
        draft.cityError = action.cityError;
        break;
    }
  });

export default weatherContainerReducer;
