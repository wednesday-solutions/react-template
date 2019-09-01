/*
 *
 * HomeContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_GET_GITHUB_REPOS,
  SUCCESS_GET_GITHUB_REPOS,
  FAILURE_GET_GITHUB_REPOS
} from './constants'

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
}

export function getGithubRepos(repoName) {
  return {
    type: REQUEST_GET_GITHUB_REPOS,
    repoName
  }
}

export function successGithubRepos(data) {
  return {
    type: SUCCESS_GET_GITHUB_REPOS,
    data
  }
}

export function failureGithubRepos(error) {
  return {
    type: FAILURE_GET_GITHUB_REPOS,
    error
  }
}
