/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';
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
import history from '@utils/history';
import { SCREEN_BREAK_POINTS } from '@utils/constants';
import configureStore from '@app/configureStore';
import { ThemeProvider, useTheme } from '@app/contexts/themeContext';
import { DarkModeToggle } from '@app/components/DarkModeToggle';

/**
 * App component that sets up the application with routing, theme, and language support.
 * It also handles redirect logic based on the query parameters in the URL.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @returns {JSX.Element} The App component with the application setup.
 */
function AppContent() {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);
  const { colors: themeColors } = useTheme();

  // Create MUI theme that responds to dark mode
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: themeColors.primary
          },
          secondary: {
            main: themeColors.secondary
          },
          background: {
            default: themeColors.background,
            paper: themeColors.surface
          },
          text: {
            primary: themeColors.text,
            secondary: themeColors.textSecondary
          }
        },
        breakpoints: {
          values: SCREEN_BREAK_POINTS
        }
      }),
    [themeColors]
  );

  const { location } = history;
  useEffect(() => {
    if (location.search.includes('?redirect_uri=')) {
      const routeToReplace = new URLSearchParams(location.search).get('redirect_uri');
      if (routeToReplace && routeToReplace.startsWith('/') && !routeToReplace.startsWith('//')) {
        history.replace(routeToReplace);
      }
    }
    const { store: s, persistor: p } = configureStore({}, history);
    setStore(s);
    setPersistor(p);
  }, []);

  return (
    <If condition={!!persistor} otherwise={<div>LOADING</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <ScrollToTop>
            <ErrorBoundary>
              <Provider store={store}>
                <ConnectedLanguageProvider messages={translationMessages}>
                  <StyledEngineProvider injectFirst>
                    <MUIThemeProvider theme={muiTheme}>
                      <CssBaseline />
                      <Global styles={globalStyles} />
                      <Header />
                      <Container>
                        <For
                          ParentComponent={(props) => <Switch {...props} />}
                          of={Object.keys(routeConfig)}
                          renderItem={(routeKey) => {
                            // eslint-disable-next-line security/detect-object-injection
                            const routeConfigItem = routeConfig[routeKey];
                            const Component = routeConfigItem.component;
                            return (
                              <Route
                                exact={routeConfigItem.exact}
                                key={routeKey}
                                path={routeConfigItem.route}
                                render={(props) => {
                                  const updatedProps = {
                                    ...props,
                                    ...routeConfigItem.props
                                  };
                                  return <Component {...updatedProps} />;
                                }}
                              />
                            );
                          }}
                        />
                      </Container>
                      <DarkModeToggle />
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

/**
 * App wrapper component that provides theme context
 * @returns {JSX.Element} The App component wrapped in ThemeProvider
 */
export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
