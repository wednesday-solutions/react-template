import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

const selectWeatherContainerDomain = state => state.weatherContainer || initialState;

export const selectWeatherContainer = () =>
  createSelector(
    selectWeatherContainerDomain,
    substate => substate
  );

export const selectCityName = () =>
  createSelector(
    selectWeatherContainerDomain,
    substate => get(substate, 'cityName', null)
  );
export const selectCityData = () =>
  createSelector(
    selectWeatherContainerDomain,
    substate => get(substate, 'cityData', {})
  );

export const selectCityError = () =>
  createSelector(
    selectWeatherContainerDomain,
    substate => get(substate, 'cityError', null)
  );

export default selectWeatherContainer;
