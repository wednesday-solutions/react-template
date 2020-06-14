import {
  homeContainerReducer,
  initialState,
  homeContainerTypes
} from '../reducer';
import {
  successGetArtistSongsAction,
  failureGetArtistSongsAction,
  clearArtistSongsAction,
  normalizedSongsData
} from './__mocks__/songs.mocks';

/* eslint-disable default-case, no-param-reassign */
describe('HomeContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  describe('GithubRepos reducer tests', () => {
    it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
      const repoName = 'Mohammed Ali Chherawalla';
      const expectedResult = state.set('repoName', repoName);
      expect(
        homeContainerReducer(state, {
          type: homeContainerTypes.REQUEST_GET_GITHUB_REPOS,
          repoName
        })
      ).toEqual(expectedResult);
    });

    it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
      const data = { name: 'Mohammed Ali Chherawalla' };
      const expectedResult = state.set('reposData', data);
      expect(
        homeContainerReducer(state, {
          type: homeContainerTypes.SUCCESS_GET_GITHUB_REPOS,
          repoData: data
        })
      ).toEqual(expectedResult);
    });

    it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
      const error = 'something_went_wrong';
      const expectedResult = state.set('reposError', error);
      expect(
        homeContainerReducer(state, {
          type: homeContainerTypes.FAILURE_GET_GITHUB_REPOS,
          error
        })
      ).toEqual(expectedResult);
    });
  });

  describe('ItunesSongs reducer tests', () => {
    const artistName = 'Coldplay';

    it('should set artistName when REQUEST_GET_ARTIST_SONGS is dispatched', () => {
      const expectedResult = state.set('artistName', artistName);
      expect(
        homeContainerReducer(state, {
          type: homeContainerTypes.REQUEST_GET_ARTIST_SONGS,
          artistName
        })
      ).toEqual(expectedResult);
    });

    it('should correctly set songs data when SUCCESS_GET_ARTIST_SONGS is dispatched', () => {
      let expectedResult = normalizedSongsData;

      const updatedState = homeContainerReducer(
        state,
        successGetArtistSongsAction
      );
      const updatedStateJS = updatedState.toJS();

      expect(updatedStateJS).toEqual(expectedResult);

      expectedResult = {
        ...expectedResult,
        songsCount: 3,
        allTrackIds: [1, 2, 3]
      };

      expect(updatedStateJS).not.toEqual(expectedResult);
    });

    it('should correctly set songs error when FAILURE_GET_ARTIST_SONGS is dispatched', () => {
      const expectedResult = {
        songsError: 'something_went_wrong'
      };
      const updatedState = homeContainerReducer(
        state,
        failureGetArtistSongsAction
      );
      const updatedStateJS = updatedState.toJS();

      expect(updatedStateJS).toEqual(expectedResult);
    });

    it('should clear songs related state when CLEAR_ARTIST_SONGS is dispatched', () => {
      const expectedResult = {
        artistName: null,
        songsData: null,
        songsCount: null,
        allTrackIds: null,
        songsError: null
      };
      const updatedState = homeContainerReducer(state, clearArtistSongsAction);
      const updatedStateJS = updatedState.toJS();

      expect(updatedStateJS).toEqual(expectedResult);
    });
  });
});
