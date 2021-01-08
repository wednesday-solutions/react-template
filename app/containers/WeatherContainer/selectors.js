import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the weatherContainer state domain
 */

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
    substate => get(substate, 'cityData', null)
  );

export const selectCityError = () =>
  createSelector(
    selectWeatherContainerDomain,
    substate => get(substate, 'cityError', null)
  );

export default selectWeatherContainer;
