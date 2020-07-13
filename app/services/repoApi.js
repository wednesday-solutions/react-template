import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const iTunesApi = generateApiClient('iTunes');
export const getRepos = repoName => repoApi.get(`/search/repositories?q=${repoName}`);
export const getITunes = iTuneName => iTunesApi.get(`/search?term=${iTuneName}`);
