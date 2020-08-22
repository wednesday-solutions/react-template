# React Template

![React Template CI](https://github.com/wednesday-solutions/react-template/workflows/React%20Template%20CI/badge.svg)

### Built using [react-floki](https://github.com/wednesday-solutions/react-floki)

<img src="./react-template.png" height="350px" />

## API Calls

- API calls using [Api Sauce](https://github.com/infinitered/apisauce/)

  Take a look at the following files

  - [app/utils/apiUtils.js](app/utils/apiUtils.js)
  - [app/services/repoApi.js](app/services/repoApi.js)
  - [app/containers/HomeContainer/saga.js](app/containers/HomeContainer/saga.js)

## Side Effects

- Side effects using [Redux Saga](https://github.com/redux-saga/redux-saga)

  Take a look at the following files

  - [app/utils/injectSaga.js](app/utils/injectSaga.js)
  - [app/utils/sagaInjectors.js](app/utils/sagaInjectors.js)
  - [app/containers/HomeContainer/saga.js](app/containers/HomeContainer/saga.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

## Global state management

- Global state management using [Redux Sauce](https://github.com/infinitered/reduxsauce)

  Take a look at the following files

  - [app/containers/HomeContainer/reducer.js](app/containers/HomeContainer/reducer.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

- Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)

  Take a look at the following files

  - [app/containers/HomeContainer/selector.js](app/containers/HomeContainer/selector.js)

## Design and Style

- Styling components using [Styled Components](https://styled-components.com)

  Take a look at the following files

  - [app/components/T/index.js](app/components/T/index.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

- Reusing components from [Ant design](https://ant.design)

  Take a look at the following files

  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

## Translations

- Translations using [React Intl](https://github.com/formatjs/react-intl)

  Take a look at the following files

  - [app/translations/en.json](app/translations/en.json)
  - [app/containers/LanguageProvider/](app/containers/LanguageProvider/)
  - [app/i18n](app/i18n.js)

## Routing

- Routing is done using [React Router](https://github.com/ReactTraining/react-router)

  Take a look at the following files

  - [app/routeConfig.js](app/routeConfig.js)
  - [app/containers/App/index.js](app/containers/App/index.js)

## Aliasing

- @app -> app/
- @containers -> app/containers/
- @components -> app/components/
- @services -> app/services/
- @utils -> app/utils/

Take a look at the following files

- [internals/webpack/webpack.base.babel.js](internals/webpack/webpack.base.babel.js)

## Chunkify and Lazy loading

Take a look at the following files

- [app/containers/HomeContainer/Loadable.js](app/containers/HomeContainer/Loadable.js)
- [app/utils/loadable.js](app/utils/loadable.js)

## App entry point

- [app/app.js](app/app.js)

## PWA

- [Offline Plugin](https://github.com/NekR/offline-plugin)
- [Webpack PWA Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)

Take a look at the following files

- [app/app.js](app/app.js)
- [internals/webpack/webpack.prod.babel.js](internals/webpack/webpack.prod.babel.js)

## Scaffolding components

Components, containers, tests and stories can be scaffolded using

```
yarn generate
```

For documentation take a look at: [react-floki](https://github.com/wednesday-solutions/react-floki)

## Gotchas	

- For github pages to work on an [arbitrary route](https://wednesday-solutions.github.io/react-template/) we have the used some workarounds.
For production builds deployed directly on `/` you need to make the following changes
  1. [publicPath: process.env.NODE_ENV === 'production' ? '/react-template/' : '/'](https://github.com/wednesday-solutions/react-template/blob/master/internals/webpack/webpack.base.babel.js#L29)
   should be: ```publicPath: '/'	```
  2. [relativePaths: process.env.NODE_ENV === 'production'](https://github.com/wednesday-solutions/react-template/blob/master/internals/webpack/webpack.prod.babel.js#L85)
  should be: ```relativePaths: false,```
  2. [const history = createBrowserHistory({ basename: baseUrl });](https://github.com/wednesday-solutions/react-template/blob/master/app/utils/history.js#L3)
  should be:  ```const history = createBrowserHistory();```
