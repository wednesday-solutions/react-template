import { generateApiClient } from '@utils/apiUtils';
const cityApi = generateApiClient('weather');

export const getCity = cityName =>
  cityApi.get(`/data/2.5/weather?q=${cityName}&appid=33b7ce91927accbd6252f527f5f73890`);
