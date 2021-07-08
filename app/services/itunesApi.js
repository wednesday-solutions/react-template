import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('iTunes');

export const getTracks = artistName => iTunesApi.get(`search?term=${artistName}`);
