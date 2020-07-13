/**
 * Test store addons
 */

import { browserHistory } from 'react-router-dom';
import configureStore from '../configureStore';

describe('configureStore tests', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory).store;
  });

  it('should contain an object for reducers', () => {
    expect(typeof store.injectedReducers).toBe('object');
  });

  it('should contain an object for sagas', () => {
    expect(typeof store.injectedSagas).toBe('object');
  });

  it('should contain a hook for `sagaMiddleware.run`', () => {
    expect(typeof store.runSaga).toBe('function');
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined, browserHistory);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
