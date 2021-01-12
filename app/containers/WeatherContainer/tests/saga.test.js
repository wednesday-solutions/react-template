/**
 * Test weatherContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getCity } from '@app/services/cityApi';
import { apiResponseGenerator } from '@utils/testUtils';
import weatherContainerSaga, { getCityWeather } from '../saga';
import { weatherContainerTypes } from '../reducer';

describe('WeatherContainer saga tests', () => {
  const generator = weatherContainerSaga();
  const cityName = 'jaipur';
  let getCityWeatherGenerator = getCityWeather({ cityName });
  it('should start task to watch for REQUEST_GET_CITY_WEATHER action', () => {
    expect(generator.next().value).toEqual(takeLatest(weatherContainerTypes.REQUEST_GET_CITY_WEATHER, getCityWeather));
  });
  it('should ensure that the action FAILURE_GET_CITY_WEATHER is dispatched when the api call fails', () => {
    const city = getCityWeatherGenerator.next().value;
    expect(city).toEqual(call(getCity, cityName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching weather informations.'
    };
    expect(getCityWeatherGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: weatherContainerTypes.FAILURE_GET_CITY_WEATHER,
        cityError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_CITY_WEATHER is dispatched when the api call succeeds', () => {
    getCityWeatherGenerator = getCityWeather({ cityName });
    const city = getCityWeatherGenerator.next().value;
    expect(city).toEqual(call(getCity, cityName));
    const cityResponse = { items: [{ cityName: cityName }] };
    expect(getCityWeatherGenerator.next(apiResponseGenerator(true, cityResponse)).value).toEqual(
      put({
        type: weatherContainerTypes.SUCCESS_GET_CITY_WEATHER,
        cityData: cityResponse
      })
    );
  });
});
