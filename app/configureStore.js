/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-root-reducer';
import { createInjectorsEnhancer } from 'redux-injectors';

// redux persit configuration
const persistConfig = {
  version: 1,
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, createReducer());

/**
 * Configures and creates the Redux store with middleware, enhancers, and support for hot reloading.
 * It also sets up Redux Saga and the Redux DevTools extension.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} [initialState={}] - The initial state of the store.
 * @returns {{ store: Object, persistor: Object }} An object containing the Redux store and the persistor for redux-persist.
 */
export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const runSaga = sagaMiddleware.run;
  const injectEnhancer = createInjectorsEnhancer({
    createReducer,
    runSaga
  });

  const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers, injectEnhancer));
  const persistor = persistStore(store);

  /* eslint-disable immutable/no-mutation */
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  /* eslint-enable immutable/no-mutation */

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./create-root-reducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  return { store, persistor };
}
