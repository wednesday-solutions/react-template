import { put, call, takeLatest } from 'redux-saga/effects';
import { getCity } from '@app/services/cityApi';

import { weatherContainerTypes, weatherContainerCreators } from './reducer';
const { REQUEST_GET_CITY_WEATHER } = weatherContainerTypes;
const { successGetCityWeather, failureGetCityWeather } = weatherContainerCreators;
export function* getCityWeather(action) {
  const response = yield call(getCity, action.cityName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetCityWeather(data));
  } else {
    yield put(failureGetCityWeather(data));
  }
}

export default function* weatherContainerSaga() {
  yield takeLatest(REQUEST_GET_CITY_WEATHER, getCityWeather);
}
