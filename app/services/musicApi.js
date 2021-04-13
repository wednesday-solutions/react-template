import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getMusics = searchTerm => itunesApi.get(`/search?term=${searchTerm}`);
