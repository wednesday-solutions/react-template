import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getDash } from '../cityApi';

describe('Dash tests', () => {
  const dashName = 'Phoenix';
  it('should make the api call to "/data/2.5/weather?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = {
      name: 'Phoenix'
    };
    mock.onGet(`/data/2.5/weather?q=${dashName}&appid=33b7ce91927accbd6252f527f5f73890`).reply(200, data);
    const dash = await getDash(dashName);
    expect(dash.data).toEqual(data);
  });
});
