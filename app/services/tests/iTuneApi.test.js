import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getTunes } from '../iTuneApi';

describe('ITunesApi tests', () => {
  const iTuneName = 'perfect';
  it('should make the api call to "/search/?term="', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      results: []
    };
    mock.onGet(`/search?term=${iTuneName}`).reply(200, data);
    const res = await getTunes(iTuneName);
    expect(res.data).toEqual(data);
  });
});
