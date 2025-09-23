/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { routeConfig } from '@app/routeConfig';
import globalStyles from '@app/global-styles';
import { Header } from '@components/Header';
import { ScrollToTop } from '@components/ScrollToTop';
import { For } from '@components/For';
import { If } from '@app/components/If';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import ErrorBoundary from '@app/components/ErrorBoundary/index';
import { translationMessages } from '@app/i18n';
import { SCREEN_BREAK_POINTS } from '@utils/constants';
import configureStore from '@app/configureStore';
import { colors } from '@themes';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  },
  breakpoints: {
    values: SCREEN_BREAK_POINTS
  }
});
/**
 * App component that sets up the application with routing, theme, and language support.
 * It also handles redirect logic based on the query parameters in the URL.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @returns {JSX.Element} The App component with the application setup.
 */
export function App() {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    // Check for redirect_uri in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri = urlParams.get('redirect_uri');
    if (redirectUri) {
      window.location.replace(redirectUri);
      return;
    }

    const { store: s, persistor: p } = configureStore({});
    setStore(s);
    setPersistor(p);
  }, []);

  return (
    <If condition={!!persistor} otherwise={<div>LOADING</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ScrollToTop>
            <ErrorBoundary>
              <Provider store={store}>
                <ConnectedLanguageProvider messages={translationMessages}>
                  <StyledEngineProvider injectFirst>
                    <MUIThemeProvider theme={theme}>
                      <CssBaseline />
                      <Global styles={globalStyles} />
                      <Header />
                      <Container>
                        <Routes>
                          <For
                            of={map(Object.keys(routeConfig))}
                            renderItem={(routeKey, index) => {
                              const Component = routeConfig[routeKey].component;
                              return (
                                <Route
                                  key={index}
                                  path={routeConfig[routeKey].route}
                                  element={<Component {...routeConfig[routeKey].props} />}
                                />
                              );
                            }}
                          />
                        </Routes>
                      </Container>
                    </MUIThemeProvider>
                  </StyledEngineProvider>
                </ConnectedLanguageProvider>
              </Provider>
            </ErrorBoundary>
          </ScrollToTop>
        </Router>
      </PersistGate>
    </If>
  );
}
App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};
export default App;
