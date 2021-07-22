import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getTrack } from '../songApi';

describe('SongApi tests', () => {
  const songName = 'song';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
  it('should make the api call to "/lookup?id="', async () => {
    const trackId = 1;
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ trackId }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getTrack(trackId);
    expect(res.data).toEqual(data);
  });
});
