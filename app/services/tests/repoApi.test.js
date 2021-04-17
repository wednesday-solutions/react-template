import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getRepos } from '../repoApi';

describe('RepoApi tests', () => {
  const repositoryName = 'mac';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ];
    mock.onGet(`/search?term=${repositoryName}`).reply(200, data);
    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(data);
  });
});
