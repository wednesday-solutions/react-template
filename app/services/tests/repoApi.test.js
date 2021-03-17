import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getArtistData } from '../repoApi';

describe('iTunesApi tests', () => {
  const artistName = 'mac';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        items: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getArtistData(artistName);
    expect(res.data).toEqual(data);
  });
});
