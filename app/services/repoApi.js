import { generateApiClient } from '@utils/apiUtils';
const itunesSearchApi = generateApiClient('itunes');

export const getArtistData = artistName => itunesSearchApi.get(`search?term=${artistName}`);
