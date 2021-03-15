import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

// const { WEATHER_URL } = process.env;
const apiClients = {
  weather: null,
  default: null
};
export const getApiClient = (type = 'weather') => apiClients[type];
export const generateApiClient = (type = 'weather') => {
  switch (type) {
    case 'weather':
      apiClients[type] = createApiClientWithTransForm('https://api.openweathermap.org/');
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm('https://api.openweathermap.org/');
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL
    // headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
