import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

/**
 * @see https://github.com/elbywan/wretch?tab=readme-ov-file#http-methods-
 */
export const getRepos = (repoName) => repoApi.get(`search/repositories?q=${repoName}`);
