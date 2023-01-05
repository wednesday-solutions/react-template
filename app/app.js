/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// Import all the third party stuff
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App/Loadable';

// Import Language Provider
import ScrollToTop from 'components/ScrollToTop';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
const container = document.getElementById('app');
const root = createRoot(container);
const render = (messages) => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </Router>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('@lcdp/offline-plugin/runtime').install({
    onUpdating: () => {
      // eslint-disable-next-line
      console.log('SW Event: onUpdating');
    },
    onUpdateReady: () => {
      // eslint-disable-next-line
      console.log('SW Event: onUpdateReady');
      // Tells to new SW to take control immediately
      require('@lcdp/offline-plugin/runtime').applyUpdate();
    },
    onUpdated: () => {
      // eslint-disable-next-line
      console.log('SW Event: onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      // eslint-disable-next-line
      console.log('SW Event: onUpdateFailed');
    }
  });
}
