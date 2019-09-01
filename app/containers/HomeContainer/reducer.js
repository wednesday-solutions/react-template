/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer'
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  REQUEST_GET_GITHUB_REPOS,
  SUCCESS_GET_GITHUB_REPOS,
  FAILURE_GET_GITHUB_REPOS
} from './constants'

export const initialState = fromJS({})

/* eslint-disable default-case, no-param-reassign */
const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break
      case REQUEST_GET_GITHUB_REPOS:
        return initialState.set('repoName', action.repoName)
      case SUCCESS_GET_GITHUB_REPOS:
        return state.set('reposData', action.data)
      case FAILURE_GET_GITHUB_REPOS:
        return state.set('reposError', action.error)
    }
    return state
  })

export default homeContainerReducer
