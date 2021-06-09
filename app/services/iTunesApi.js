import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');
export const getSongs = songName => {
  return itunesApi.get(`/search?term=${songName}`);
};
