import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSongs = (searchTerm) => itunesApi.get(`/search?term=${searchTerm}&media=music`);

export const getSongDetails = (songId) => itunesApi.get(`/lookup?id=${songId}`);
