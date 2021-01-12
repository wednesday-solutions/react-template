import { weatherContainerTypes, weatherContainerCreators } from '../reducer';

describe('WeatherContainer action tests', () => {
  it('has a type of REQUEST_GET_CITY_WEATHER', () => {
    const expected = {
      type: weatherContainerTypes.REQUEST_GET_CITY_WEATHER,
      cityName: 'cityName'
    };
    expect(weatherContainerCreators.requestGetCityWeather('cityName')).toEqual(expected);
  });
});
