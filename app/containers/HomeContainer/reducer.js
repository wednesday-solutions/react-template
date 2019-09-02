/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer'
import { fromJS } from 'immutable'
import { createActions } from 'reduxsauce'
import _ from 'lodash'

export const { Types: repoTypes, Creators: repoCreators } = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error']
})
export const initialState = fromJS({})

/* eslint-disable default-case, no-param-reassign */
const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case repoTypes.REQUEST_GET_GITHUB_REPOS:
        return initialState.set('repoName', action.repoName)
      case repoTypes.SUCCESS_GET_GITHUB_REPOS:
        return state.set('reposData', action.data)
      case repoTypes.FAILURE_GET_GITHUB_REPOS:
        return state.set(
          'reposError',
          _.get(action.error, 'message', 'something_went_wrong')
        )
    }
    return state
  })

export default homeContainerReducer
