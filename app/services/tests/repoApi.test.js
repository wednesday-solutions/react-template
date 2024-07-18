import { getRepos } from '../repoApi';

describe('RepoApi tests', () => {
  const repositoryName = 'mac';

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should make the api call to "/search/repositories?q="', async () => {
    const data = {
      totalCount: 1,
      items: [{ repositoryName }]
    };

    fetch.mockResponseOnce(JSON.stringify(data), { status: 200 });

    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(data);
  });
});
