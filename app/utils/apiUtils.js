import { create } from 'apisauce';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const apiClients = {
  github: null,
  default: null
};
export const getApiClient = (type = 'github') => apiClients[type];
export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(process.env.GITHUB_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(process.env.GITHUB_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = (baseURL) => {
  const customAxiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  const api = create({ axiosInstance: customAxiosInstance });
  axiosRetry(customAxiosInstance, { retries: 3 });
  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, (keys) => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform((request) => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, (keys) => snakeCase(keys));
    }
    return request;
  });
  return api;
};
