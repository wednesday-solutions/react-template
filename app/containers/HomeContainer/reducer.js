/**
 * https://jsdoc.app/index.html
 *
 * @typedef HomeState
 * @type {object}
 * @property {string} repo - search key.
 * @property {string} data - repos fetched from the api.
 * @property {string} error - api error.
 */

import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';

/** @type {HomeState} */
export const initialState = { repo: null, data: null, error: null };

/**
 *
 * @abstract redux slice for the Home container
 * @description creates a slice to be used on the Home container.
 *
 *
 */
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    /**
     * @abstract search key to be used as the repositories= query parameter
     */
    requestGetGithubRepos(state, action) {
      state.repo = action.payload;
    },
    /**
     *
     * @abstract action to save the repos fetched from the api
     */
    successGetGithubRepos(state, action) {
      state.data = action.payload;
    },
    /**
     *
     * @abstract action to save the error returned by the api
     * @description Incase the action is dispatched without a message,
     * an translation id for "Something Went Wrong" is stored.
     */
    failureGetGithubRepos(state, action) {
      state.error = get(action.payload, 'message', 'something_went_wrong');
    },
    /**
     *
     * @abstract Clear the stored github Repos
     * @description initialState is returned.
     */
    clearGithubRepos() {
      return initialState;
    }
  }
});

/**
 * @description
 * actionsCreators are functions to construct an object
 * that can be passed to the store dispathcer.
 * The type string will be the slice name + function name.
 *
 * @example
 * requestGetGithubRepos() will return {type: "home/requestGetGithubRepos", payload: undefined}
 *
 * @tutorial
 * actionCreators implement a toString function to access the type of the action.
 */

export const { requestGetGithubRepos, successGetGithubRepos, failureGetGithubRepos, clearGithubRepos } =
  homeSlice.actions;

export default homeSlice.reducer;
