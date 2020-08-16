import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('iTunes');
export const getTunes = iTuneName => iTunesApi.get(`/search?term=${iTuneName}`);
