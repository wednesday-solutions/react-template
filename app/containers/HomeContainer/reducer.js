/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['repoData'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: [],
  requestGetArtistSongs: ['artistName'],
  successGetArtistSongs: ['songsData'],
  failureGetArtistSongs: ['error'],
  clearArtistSongs: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // github
      case homeContainerTypes.REQUEST_GET_GITHUB_REPOS:
        return initialState.set('repoName', action.repoName);
      case homeContainerTypes.CLEAR_GITHUB_REPOS:
        return state.merge({
          repoName: null,
          reposData: null,
          reposError: null
        });
      case homeContainerTypes.SUCCESS_GET_GITHUB_REPOS:
        return state.set('reposData', action.repoData);
      case homeContainerTypes.FAILURE_GET_GITHUB_REPOS:
        return state.set(
          'reposError',
          _.get(action.error, 'message', 'something_went_wrong')
        );

      // itunes songs
      case homeContainerTypes.REQUEST_GET_ARTIST_SONGS:
        return state.set('artistName', action.artistName);
      case homeContainerTypes.SUCCESS_GET_ARTIST_SONGS: {
        const { results, resultCount } = action.songsData;
        const filteredTrackIds = results?.map(
          result => result.trackId || _.uniqueId()
        );
        return state
          .set('songsData', _.keyBy(results, 'trackId'))
          .set('songsCount', resultCount)
          .set('allTrackIds', filteredTrackIds);
      }
      case homeContainerTypes.CLEAR_ARTIST_SONGS:
        return state.merge({
          artistName: null,
          songsData: null,
          songsCount: null,
          allTrackIds: null,
          songsError: null
        });
      case homeContainerTypes.FAILURE_GET_ARTIST_SONGS:
        return state.set(
          'songsError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default homeContainerReducer;
