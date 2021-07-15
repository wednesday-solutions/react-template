import { generateApiClient } from '@utils/apiUtils';
const songApi = generateApiClient('itunes');
export const getSongs = query => songApi.get(`/search?term=${query}`);
export const getTrack = id => songApi.get(`/lookup?id=${id}`);
