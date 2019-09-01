import { create } from 'apisauce'
import mapKeysDeep from 'map-keys-deep'
import { camelCase, snakeCase } from 'lodash'
const apiClients = {
  github: null,
  default: null
}
export const getApiClient = (type = 'github') => apiClients[type]
export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm()
      return apiClients[type]
    default:
      apiClients.default = createApiClientWithTransForm()
      return apiClients.default
  }
}

export const createApiClientWithTransForm = () => {
  const api = create({
    baseURL: 'https://api.github.com/',
    headers: { 'Content-Type': 'application/json' }
  })
  api.addResponseTransform(response => {
    const { ok, data } = response
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys))
    }
    return response
  })

  api.addRequestTransform(request => {
    const { data } = request
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys))
    }
    return request
  })
  return api
}
