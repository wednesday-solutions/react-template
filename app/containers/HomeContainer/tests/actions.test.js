import { homeContainerTypes, homeContainerCreators } from '../reducer';
import {
  successGetArtistSongsAction,
  failureGetArtistSongsAction,
  clearArtistSongsAction
} from './__mocks__/actions.mocks';

describe('GithubRepos action tests', () => {
  it('has a type of REQUEST_GET_GITHUB_REPOS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_GITHUB_REPOS,
      repoName: 'repoName'
    };
    expect(homeContainerCreators.requestGetGithubRepos('repoName')).toEqual(
      expected
    );
  });
});

describe('ItunesSongs action tests', () => {
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
    expect(
      homeContainerCreators.successGetArtistSongs(
        successGetArtistSongsAction.songsData
      )
    ).toEqual(successGetArtistSongsAction);

    const updatedAction = {
      ...successGetArtistSongsAction,
      data: successGetArtistSongsAction.songsData
    };
    expect(
      homeContainerCreators.successGetArtistSongs(
        successGetArtistSongsAction.songsData
      )
    ).not.toEqual(updatedAction);
  });

  it('should have a type of FAILURE_GET_ARTIST_SONGS', () => {
    expect(
      homeContainerCreators.failureGetArtistSongs(
        failureGetArtistSongsAction.error
      )
    ).toEqual(failureGetArtistSongsAction);
  });

  it('should have a type of CLEAR_ARTIST_SONGS', () => {
    expect(homeContainerCreators.clearArtistSongs()).toEqual(
      clearArtistSongsAction
    );
  });
});
