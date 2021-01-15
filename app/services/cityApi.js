import { generateApiClient } from '@utils/apiUtils';
const dashApi = generateApiClient('weather');

export const getDash = dashName =>
  dashApi.get(`/data/2.5/weather?q=${dashName}&appid=33b7ce91927accbd6252f527f5f73890`);
