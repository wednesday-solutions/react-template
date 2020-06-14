import { fromJS } from 'immutable';
import {
  selectHomeContainer,
  selectRepoName,
  selectReposData,
  selectReposError,
  selectArtistName,
  selectSongsData,
  selectTrackIds,
  selectSongsError
} from '../selectors';
import { normalizedSongsState } from './__mocks__/songs.mocks';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let repoName;
  let reposData;
  let reposError;
  let artistName;
  let songsData;
  let allTrackIds;
  let songsError;

  beforeEach(() => {
    repoName = 'mac';
    reposData = { totalCount: 1, items: [{ repoName }] };
    reposError = 'There was some error while fetching the repository details';
    artistName = 'Coldplay';
    songsData = normalizedSongsState.songsData;
    allTrackIds = normalizedSongsState.allTrackIds;
    songsError = 'something_went_wrong';

    mockedState = {
      homeContainer: fromJS({
        repoName,
        reposData,
        reposError,
        artistName,
        songsData,
        allTrackIds,
        songsError
      })
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(
      mockedState.homeContainer.toJS()
    );
  });

  describe('GithubRepos selector tests', () => {
    it('should select the repoName', () => {
      const repoSelector = selectRepoName();
      expect(repoSelector(mockedState)).toEqual(repoName);
    });

    it('should select reposData', () => {
      const reposDataSelector = selectReposData();
      expect(reposDataSelector(mockedState)).toEqual(reposData);
    });

    it('should select the reposError', () => {
      const reposErrorSelector = selectReposError();
      expect(reposErrorSelector(mockedState)).toEqual(reposError);
    });
  });

  describe('ItunesSongs selector tests', () => {
    it('should select the artistName', () => {
      const artistNameSelected = selectArtistName()(mockedState);
      expect(artistNameSelected).toEqual(artistName);
    });

    it('should select songs data', () => {
      const selectedSongsData = selectSongsData()(mockedState);
      expect(selectedSongsData).toEqual(songsData);
    });

    it('should select all trackIds', () => {
      const selectedTrackIds = selectTrackIds()(mockedState);
      expect(selectedTrackIds).toEqual(allTrackIds);
    });

    it('should select songs error', () => {
      const selectedSongsError = selectSongsError()(mockedState);
      expect(selectedSongsError).toEqual(songsError);
    });
  });
});
