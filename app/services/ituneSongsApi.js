import { create } from 'apisauce';

const { ITUNES_URL = 'https://itunes.apple.com/' } = process.env;

export const getSongsApi = artistName => {
  const api = create({
    ITUNES_URL,
    headers: { 'Content-Type': 'application/json' }
  });

  return api.get(`${ITUNES_URL}search/?term=${artistName}`);
};
