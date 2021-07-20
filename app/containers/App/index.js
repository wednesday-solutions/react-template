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
import styled,{ThemeProvider} from 'styled-components';
import { routeConfig } from '@app/routeConfig';
import GlobalStyle from '@app/global-styles';
import { colors } from '@themes';
import {For,Header} from 'ws-react-sdk';
import logo from '@images/icon-512x512.png';
import { injectIntl } from 'react-intl';

const theme = {
  fg: colors.primary,
  bg: colors.secondary
};
const HeaderStyled = styled(Header)`
  &&{
    background-color: ${colors.primary};
    img{
      height: 5em;
      width: auto;
      margin-right: 1em;
    }
  }
`
export function App({ location,intl }) {
  return (
    <ThemeProvider theme={theme}>
        <HeaderStyled logo={logo} header={intl.formatMessage({ id: 'wednesday_solutions' })} />
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
                path={routeConfig[routeKey].route}
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
  intl: PropTypes.object,
  location: PropTypes.object
};
export default compose(withRouter,injectIntl)(App);
