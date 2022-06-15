import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackInfo state domain
 */

const selectTrackInfoDomain = (state) => state.trackInfoContainer || initialState;

const makeSelectTrackInfo = () => createSelector(selectTrackInfoDomain, (substate) => substate);

export default makeSelectTrackInfo;
export { selectTrackInfoDomain };

export const selectSongInfo = () => createSelector(selectTrackInfoDomain, (substate) => get(substate, 'songDetails'));

export const selectSongInfoError = () => createSelector(selectTrackInfoDomain, (substate) => get(substate, 'error'));
