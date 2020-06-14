import { homeContainerTypes } from '../../reducer';

const artistName = 'Coldplay';

// Actions
export const successGetArtistSongsAction = {
  type: homeContainerTypes.SUCCESS_GET_ARTIST_SONGS,
  songsData: {
    results: [
      {
        trackId: 1,
        artistName
      },
      {
        trackId: 2,
        artistName
      }
    ],
    resultCount: 2
  }
};

const error = {
  message: 'something_went_wrong'
};
export const failureGetArtistSongsAction = {
  type: homeContainerTypes.FAILURE_GET_ARTIST_SONGS,
  error
};

export const clearArtistSongsAction = {
  type: homeContainerTypes.CLEAR_ARTIST_SONGS
};

// Normalized state
export const normalizedSongsData = {
  songsData: {
    '1': { trackId: 1, artistName },
    '2': { trackId: 2, artistName }
  },
  songsCount: 2,
  allTrackIds: [1, 2]
};
