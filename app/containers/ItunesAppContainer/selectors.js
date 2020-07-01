import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';


/**
 * Direct selector to the itunesAppContainer state domain
 */

const selectItunesAppContainerDomain = state => (state.ituneAppContainer || initialState).toJS()


const makeSelectItunesAppContainer = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => substate
  );


export const selectSongsData = () =>
  createSelector(
    selectItunesAppContainerDomain,
    substate => get(substate, 'songsData', null))

export const selectShowLoader = () =>
  createSelector(selectItunesAppContainerDomain,
   substate => get(substate, 'showLoader', false))


export default makeSelectItunesAppContainer;
export { selectItunesAppContainerDomain };
