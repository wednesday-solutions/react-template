import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('itunes');

export const getRepos = repoName => repoApi.get(`/search?term=${repoName}`);
