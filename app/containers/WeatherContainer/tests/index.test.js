/**
 *
 * Tests for WeatherContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { WeatherContainerTest as WeatherContainer } from '../index';

describe('<WeatherContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<WeatherContainer dispatchCityWeather={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call', async () => {
    const getCityWeatherSpy = jest.fn();
    const { getByTestId } = renderProvider(<WeatherContainer dispatchCityWeather={getCityWeatherSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getCityWeatherSpy).toBeCalled();
  });

  it('should call dispatchCityWeather on change', async () => {
    const { getByTestId } = renderProvider(<WeatherContainer dispatchCityWeather={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some city' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
