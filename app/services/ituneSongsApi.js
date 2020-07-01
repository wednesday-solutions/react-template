import { create } from 'apisauce';

const { ITUNES_URL = 'https://itunes.apple.com/' } = process.env;

export const getSongsApi = async artistName => {
  const api = create({
    ITUNES_URL,
    headers: { 'Content-Type': 'application/json' }
  });

  const response = await api.get(`${ITUNES_URL}search/?term=${artistName}`);
  
  
  return response.data.results

};
