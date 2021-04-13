import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const ITUNES_URL = process.env.ITUNES_URL;
const GITHUB_URL = process.env.GITHUB_URL;

const apiClients = {
  itunes: null,
  github: null,
  default: null
};

export const getApiClient = (type = 'github') => apiClients[type];

export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'itunes':
      apiClients[type] = createApiClientWithTransForm(ITUNES_URL);
      return apiClients[type];

    case 'github':
      apiClients[type] = createApiClientWithTransForm(GITHUB_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(ITUNES_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
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
