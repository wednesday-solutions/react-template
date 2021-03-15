import { selectWeatherContainer, selectCityData, selectCityError, selectCityName } from '../selectors';

describe('WeatherContainer selector tests', () => {
  let mockedState;
  let cityName;
  let cityData;
  let cityError;
  beforeEach(() => {
    cityName = 'Jaipur';
    cityData = { name: 'Jaipur' };
    cityError = 'There was some error while fetching the city details';

    mockedState = {
      weatherContainer: {
        cityName,
        cityData,
        cityError
      }
    };
  });

  it('should select the weatherContainer state', () => {
    const weatherContainerSelector = selectWeatherContainer();
    expect(weatherContainerSelector(mockedState)).toEqual(mockedState.weatherContainer);
  });
  it('should select the cityName', () => {
    const citySelector = selectCityName();
    expect(citySelector(mockedState)).toEqual(cityName);
  });

  it('should select cityData', () => {
    const cityDataSelector = selectCityData();
    expect(cityDataSelector(mockedState)).toEqual(cityData);
  });

  it('should select the cityError', () => {
    const cityErrorSelector = selectCityError();
    expect(cityErrorSelector(mockedState)).toEqual(cityError);
  });
});
