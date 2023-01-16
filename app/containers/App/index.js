/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import map from 'lodash/map';
import { Layout } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import { routeConfig } from '@app/routeConfig';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@app/global-styles';
import { colors } from '@themes';
import Header from '@components/Header';
import ScrollToTop from '@components/ScrollToTop';
import For from '@components/For';
import LanguageProvider from 'containers/LanguageProvider';
import ErrorBoundary from '@app/components/ErrorBoundary/index';
import { translationMessages } from '@app/i18n';
import { Provider } from 'react-redux';
import history from '@utils/history';
import configureStore from '@app/configureStore';
import If from '@app/components/If/index';

const theme = {
  fg: colors.primary,
  bg: colors.secondary
};

export function App() {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  const { location } = history;
  useEffect(() => {
    if (location.search.includes('?redirect_uri=')) {
      const routeToReplace = new URLSearchParams(location.search).get('redirect_uri');
      history.replace(routeToReplace);
    }
    const { store: s, persistor } = configureStore({}, history);
    setStore(s);
    setPersistor(persistor);
  }, []);

  return (
    <If condition={!!persistor} otherwise={<div>LOADING</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <ScrollToTop>
            <ErrorBoundary>
              <Provider store={store}>
                <LanguageProvider messages={translationMessages}>
                  <ThemeProvider theme={theme}>
                    <Header />
                    <Layout.Content>
                      <For
                        ParentComponent={(props) => <Switch {...props} />}
                        of={map(Object.keys(routeConfig))}
                        renderItem={(routeKey, index) => {
                          const Component = routeConfig[routeKey].component;
                          return (
                            <Route
                              exact={routeConfig[routeKey].exact}
                              key={index}
                              path={routeConfig[routeKey].route}
                              render={(props) => {
                                const updatedProps = {
                                  ...props,
                                  ...routeConfig[routeKey].props
                                };
                                return <Component {...updatedProps} />;
                              }}
                            />
                          );
                        }}
                      />
                      <GlobalStyle />
                    </Layout.Content>
                  </ThemeProvider>
                </LanguageProvider>
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
