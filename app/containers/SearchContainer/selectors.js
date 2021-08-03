import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the searchContainer state domain
 */

const selectSearchContainerDomain = state => state.searchContainer || initialState

const makeSelectSearchContainer = () =>
  createSelector(selectSearchContainerDomain, substate => substate)

export default makeSelectSearchContainer
export { selectSearchContainerDomain }
