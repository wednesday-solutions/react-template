/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { routeConfig } from '@app/routeConfig';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@app/global-styles';
import { colors } from '@themes';

const theme = {
  fg: colors.primary,
  bg: colors.secondary
};

const App = ({ location }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          {_.map(Object.keys(routeConfig), (routeKey, index) => (
            <Route
              exact={routeConfig[routeKey].exact}
              key={index}
              path={location.pathname + routeConfig[routeKey].route}
              component={routeConfig[routeKey].component}
            />
          ))}
        </Switch>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
};
App.propTypes = {
  location: PropTypes.object
};
export default compose(withRouter)(App);
