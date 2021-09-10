import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getArtists } from '../repoApi';

describe('ItunesApi tests', () => {
  const artistsName = 'mac';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        items: [{ artistsName }]
      }
    ];
    mock.onGet(`/search?term=${artistsName}`).reply(200, data);
    const res = await getArtists(artistsName);
    expect(res.data).toEqual(data);
  });
});
