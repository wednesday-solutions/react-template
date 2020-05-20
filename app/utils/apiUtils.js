import { create } from 'apisauce';
import mapKeysDeep from 'deep-map-keys';
import { camelCase, snakeCase } from 'lodash';

const { GITHUB_URL } = process.env;
const apiClients = {
  github: null,
  default: null
};
export const getApiClient = (type = 'github') => apiClients[type];
export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(GITHUB_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(GITHUB_URL);
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
