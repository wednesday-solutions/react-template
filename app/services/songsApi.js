import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('itunes');

export const getSongs = songTerm => repoApi.get(`/search?term=${songTerm}`);
