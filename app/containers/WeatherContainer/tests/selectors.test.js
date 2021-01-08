import { fromJS } from 'immutable';
import { selectWeatherContainerDomain } from '../selectors';

describe('WeatherContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      weatherContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectWeatherContainerDomain(mockedState)).toEqual(mockedState.weatherContainer.toJS());
  });
});
