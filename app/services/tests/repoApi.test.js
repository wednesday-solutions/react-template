import MockAdapter from 'axios-mock-adapter'
import { getApiClient } from '@utils/apiUtils'
import { getRepos } from '../repoApi'

describe('RepoApi', () => {
  const repositoryName = 'mac'
  it('Should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance)
    const data = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ]
    mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, data)
    const res = await getRepos(repositoryName)
    expect(res.data).toEqual(data)
  })
})
