import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getCity } from '../cityApi';

describe('CityApi tests', () => {
  const cityName = 'jaipur';
  it('should make the api call to "/data/2.5/weather?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = {
      name: 'Jaipur'
    };
    mock.onGet(`/data/2.5/weather?q=${cityName}&appid=33b7ce91927accbd6252f527f5f73890`).reply(200, data);
    const city = await getCity(cityName);
    expect(city.data).toEqual(data);
  });
});
