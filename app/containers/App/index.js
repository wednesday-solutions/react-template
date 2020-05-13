/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import map from 'lodash/map';
import { compose } from 'redux';
import { Layout } from 'antd';
import { routeConfig } from '@app/routeConfig';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@app/global-styles';
import { colors } from '@themes';
import Header from '@components/Header';
import For from '@components/For';

const theme = {
  fg: colors.primary,
  bg: colors.secondary
};

export function App({ location }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Layout.Content>
        <For
          ParentComponent={props => <Switch {...props} />}
          of={map(Object.keys(routeConfig))}
          renderItem={(routeKey, index) => {
            const Component = routeConfig[routeKey].component;
            return (
              <Route
                exact={routeConfig[routeKey].exact}
                key={index}
                path={`${location.pathname}${routeConfig[routeKey].route}`}
                render={props => {
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
  );
}
App.propTypes = {
  location: PropTypes.object
};
export default compose(withRouter)(App);
