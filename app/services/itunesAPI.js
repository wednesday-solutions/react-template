import { generateApiClient } from '@utils/apiUtils';
const itunesAPI = generateApiClient('itunes');

export const getSongs = searchTerm => itunesAPI.get(`/search?term=${searchTerm}`);
