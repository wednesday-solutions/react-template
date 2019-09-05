/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import _ from 'lodash'
import { compose } from 'redux'
import { routeConfig } from '@app/routeConfig'

import GlobalStyle from '@app/global-styles'

function App() {
  return (
    <div>
      <Switch>
        {_.map(Object.keys(routeConfig), (routeKey, index) => (
          <Route
            exact={routeConfig[routeKey].exact}
            key={index}
            path={routeConfig[routeKey].route}
            component={routeConfig[routeKey].component}
          />
        ))}
      </Switch>
      <GlobalStyle />
    </div>
  )
}

export default compose(withRouter)(App)
