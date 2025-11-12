import wretch from 'wretch';

/**
 * iTunes API service for searching tracks
 */
export const ITUNES_BASE_URL = 'https://itunes.apple.com';

// Create iTunes API client
const itunesApi = wretch(ITUNES_BASE_URL)
  .headers({ 'Content-Type': 'application/json' })
  .resolve(async (resolver) => {
    try {
      const response = await resolver.res((data) => data);
      const data = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        data
      };
    } catch (error) {
      return {
        ok: false,
        status: error.status,
        data: error.json
      };
    }
  });

/**
 * Search for tracks in iTunes
 * @param {string} query - The search term
 * @returns {Promise} API response with track results
 */
export const searchTracks = (query) => itunesApi.get(`/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
