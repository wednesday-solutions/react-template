import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the itunesAppContainer state domain
 */

const selectItunesAppContainerDomain = state => (state.ituneAppContainer || initialState).toJS();

const makeSelectItunesAppContainer = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => {
      const songData = get(substate, 'songsData', null);

      return songData?.filter(songItem => songItem.kind === 'song');
    }
  );

export const selectShowLoader = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => get(substate, 'showLoader', false)
  );

export const selectShowError = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => get(substate, 'showError', false)
  );

export const selectSelectedSong = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => get(substate, 'selectedSong', null)
  );

export const selectPlayingSong = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => get(substate, 'playingSong', null)
  );
export default makeSelectItunesAppContainer;
export { selectItunesAppContainerDomain };
