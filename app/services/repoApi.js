import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('github');

export const getArtistData = artistName => itunesApi.get(`search?term=${artistName}`);
