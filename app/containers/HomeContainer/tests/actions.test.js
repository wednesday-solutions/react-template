import { repoTypes, repoCreators } from '../reducer'

describe('HomeContainer actions', () => {
  describe('REQUEST_GET_GITHUB_REPOS Action', () => {
    it('has a type of REQUEST_GET_GITHUB_REPOS', () => {
      const expected = {
        type: repoTypes.REQUEST_GET_GITHUB_REPOS,
        repoName: 'repoName'
      }
      expect(repoCreators.requestGetGithubRepos('repoName')).toEqual(expected)
    })
  })
})
