import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '@services/iTunesApi';

describe('iTunes Api tests', () => {
  const songName = 'eminem';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [{ artistName: 'abc' }];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
});
