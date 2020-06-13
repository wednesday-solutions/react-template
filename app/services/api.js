import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const songsApi = generateApiClient('itunes');

export const getRepos = repoName =>
  repoApi.get(`/search/repositories?q=${repoName}`);

export const getSongs = artistName => songsApi.get(`search?term=${artistName}`);
