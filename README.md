# React Template

## API Calls

* API calls using [Api Sauce](https://github.com/infinitered/apisauce/)

  Take a look at the following files

  * [app/utils/apiUtils.js](blob/master/app/containers/HomeContainer/index.js)
  * app/service/repoApi.js

## Side Effects

* Side effects using [Redux Saga](https://github.com/redux-saga/redux-saga)

  Take a look at the following files

  * app/utils/injectSaga.js
  * app/utils/sagaInjectors.js
  * app/containers/HomeContainer/saga.js
  * app/containers/HomeContainer/actions.js
  * app/containers/HomeContainer/constants.js
  * app/containers/HomeContainer/index.js
  
## Global state management

* Global state management using [Redux](https://redux.js.org/)

  Take a look at the following files  

  * app/utils/injectReducer.js
  * app/utils/reducerInjectors.js
  * app/containers/HomeContainer/reducer.js
  * app/containers/HomeContainer/actions.js
  * app/containers/HomeContainer/constants.js
  * app/containers/HomeContainer/index.js

* Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)

  Take a look at the following files

  * app/containers/HomeContainer/selector.js

## Design and Style

* Styling components using [Styled Components](https://styled-components.com)

  Take a look at the following files

  * app/components/Text/index.js
  * app/containers/HomeContainer/index.js

* Reusing components from [Ant design](https://ant.design)

  Take a look at the following files

  * app/containers/HomeContainer/index.js
  
## Translations

* Translations using [React Intl](https://github.com/formatjs/react-intl)

  Take a look at the following files

  * app/translations/en.json
  * app/containers/LanguageProvider/
  
## Routing

* Routing is done using [React Router](https://github.com/ReactTraining/react-router)

  Take a look at the following files

  * app/routeConfig.js
  * app/containers/App/index

## Aliasing

  * @app -> app/
  * @containers -> app/containers/
  * @components -> app/components/
  * @services -> app/services/
  * @utils -> app/utils/

  Take a look at the following files

  * internals/webpack/weboack.base.babel.js

## Chunkify and Lazy loading

  Take a look at the following files
  
  * app/containers/HomeContainer/Loading.js
  * app/utils/loadable.js
