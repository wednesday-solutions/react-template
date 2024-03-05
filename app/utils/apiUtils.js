import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const API_TYPES = {
  GITHUB: 'github',
  DEFAULT: 'default'
};
const apiClients = {
  [API_TYPES.GITHUB]: null,
  [API_TYPES.DEFAULT]: null
};

/**
 * Retrieves an API client for a specified type, defaulting to 'github'.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {string} [type='github'] - The type of API client to retrieve.
 * @returns {Object} The requested API client, or undefined if it does not exist.
 */
export const getApiClient = (type = 'github') => apiClients[type];

/**
 * Generates an API client for a specified type, defaulting to 'github'.
 * If the type is 'github', it creates and stores an API client for GitHub.
 * Otherwise, it creates and stores a default API client.
 *
 * @date 01/03/2024 - 14:48:09
 *
 * @param {string} [type='github'] - The type of API client to generate.
 * @returns {Object} The generated API client.
 */
export const generateApiClient = (type = 'github') => {
  if (type === API_TYPES.GITHUB) {
    // store this value for time to come
    // eslint-disable-next-line immutable/no-mutation
    apiClients[type] = createApiClientWithTransForm(process.env.GITHUB_URL);
    return apiClients[type];
  }
  // store this value for time to come
  // eslint-disable-next-line immutable/no-mutation
  apiClients.default = createApiClientWithTransForm(process.env.GITHUB_URL);
  return apiClients[API_TYPES.DEFAULT];
};

/**
 * Creates an API client with response and request transformations.
 * The response transformation converts keys in the response data from snake_case to camelCase.
 * The request transformation converts keys in the request data from camelCase to snake_case.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {string} baseURL - The base URL for the API client.
 * @returns {Object} The API client with added transformations.
 */
export const createApiClientWithTransForm = (baseURL) => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      // this needs to actually mutate the response
      // eslint-disable-next-line immutable/no-mutation
      response.data = mapKeysDeep(data, (keys) => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform((request) => {
    const { data } = request;
    if (data) {
      // this needs to actually mutate the request
      // eslint-disable-next-line immutable/no-mutation
      request.data = mapKeysDeep(data, (keys) => snakeCase(keys));
    }
    return request;
  });
  return api;
};
