import { generateApiClient } from '@utils/apiUtils';

const songsApi = generateApiClient('itunes');

export const getSongsApi = artistName => songsApi.get(`/search/?term=${artistName}`);
