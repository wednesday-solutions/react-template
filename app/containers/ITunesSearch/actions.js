import { SEARCH_TRACKS, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR, CLEAR_TRACKS } from './constants';

/**
 * Search for tracks action
 * @param {string} query - The search query
 * @returns {object} An action object with a type of SEARCH_TRACKS
 */
export const searchTracks = (query) => ({
  type: SEARCH_TRACKS,
  query
});

/**
 * Dispatched when the search is successful
 * @param {array} tracks - The track results
 * @returns {object} An action object with a type of SEARCH_TRACKS_SUCCESS
 */
export const searchTracksSuccess = (tracks) => ({
  type: SEARCH_TRACKS_SUCCESS,
  tracks
});

/**
 * Dispatched when the search fails
 * @param {object} error - The error object
 * @returns {object} An action object with a type of SEARCH_TRACKS_ERROR
 */
export const searchTracksError = (error) => ({
  type: SEARCH_TRACKS_ERROR,
  error
});

/**
 * Clear the tracks from store
 * @returns {object} An action object with a type of CLEAR_TRACKS
 */
export const clearTracks = () => ({
  type: CLEAR_TRACKS
});
