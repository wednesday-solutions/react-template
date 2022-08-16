/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import homeContainerReducer from 'containers/HomeContainer/reducer';
import formReducer from './containers/Form/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    homeContainer: homeContainerReducer,
    form: formReducer
  });

  return rootReducer;
}
