import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_GITHUB_REPOS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_GITHUB_REPOS,
      repoName: 'repoName'
    };
    expect(homeContainerCreators.requestGetGithubRepos('repoName')).toEqual(
      expected
    );
  });

  // songs actions tests
  const artistName = 'Coldplay';

  it('should have a type of REQUEST_GET_ARTIST_SONGS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ARTIST_SONGS,
      artistName
    };
    expect(homeContainerCreators.requestGetArtistSongs(artistName)).toEqual(
      expected
    );
  });

  it('should have a type of SUCCESS_GET_ARTIST_SONGS', () => {
    const songsData = {
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
    };

    let action = {
      type: homeContainerTypes.SUCCESS_GET_ARTIST_SONGS,
      songsData
    };
    expect(homeContainerCreators.successGetArtistSongs(songsData)).toEqual(
      action
    );

    action = {
      type: homeContainerTypes.SUCCESS_GET_ARTIST_SONGS,
      data: songsData
    };
    expect(homeContainerCreators.successGetArtistSongs(songsData)).not.toEqual(
      action
    );
  });

  it('should have a type of FAILURE_GET_ARTIST_SONGS', () => {
    const error = {
      message: 'something_went_wrong'
    };
    const expected = {
      type: homeContainerTypes.FAILURE_GET_ARTIST_SONGS,
      error
    };

    expect(homeContainerCreators.failureGetArtistSongs(error)).toEqual(
      expected
    );
  });

  it('should have a type of CLEAR_ARTIST_SONGS', () => {
    const expected = {
      type: homeContainerTypes.CLEAR_ARTIST_SONGS
    };

    expect(homeContainerCreators.clearArtistSongs()).toEqual(expected);
  });
});
