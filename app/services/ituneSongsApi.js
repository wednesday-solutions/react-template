import { generateApiClient } from '@utils/apiUtils';

const songsApi = generateApiClient('itunes');

export const getSongsApi = async artistName => {
  const response = await songsApi.get(`/search/?term=${artistName}`);

  return response.data.results;
};
