import { generateApiClient } from '@utils/apiUtils';
const songApi = generateApiClient('itunes');

/**
 * @see https://github.com/elbywan/wretch?tab=readme-ov-file#http-methods-
 */
export const getSongs = (songName) => songApi.get(`search?term=${songName}`);
