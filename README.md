<img align="left" src="https://github.com/wednesday-solutions/react-template/blob/master/react_template_github.svg" width="480" height="540" />

<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=react-template" align="left" style="margin-left: 0;">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg">
  </a>
  <p>
    <h1 align="left">React Template
    </h1>
  </p>

  <p>
An enterprise react template application showcasing - Testing strategies, Global state management, middleware support, a network layer, component library integration, localization, PWA support, route configuration, lazy loading, and Continuous integration & deployment.
  </p>

---

  <p>
    <h4>
      Expert teams of digital product strategists, developers, and designers.
    </h4>
  </p>

  <div>
    <a href="https://www.wednesday.is/contact-us?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88b9005f9ed382fb2a5_button_get_in_touch.svg" width="121" height="34">
    </a>
    <a href="https://github.com/wednesday-solutions/" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88bb1958c3253756c39_button_follow_on_github.svg" width="168" height="34">
    </a>
  </div>

---

</div>

### Built using [react-floki](https://github.com/wednesday-solutions/react-floki)

![React Template CD](https://github.com/wednesday-solutions/react-template/workflows/React%20Template%20CD/badge.svg)

<div>
<img src='./badges/badge-statements.svg' height="20"/>
<img src='./badges/badge-branches.svg' height="20"/>
</div>
<div>
<img src='./badges/badge-lines.svg'  height="20"/>
<img src='./badges/badge-functions.svg' height="20"/>
</div>

## Getting Started

- Install dependencies using `yarn install`

- Run the initialize script using `yarn run initialize`

- Start the dev server using `yarn start`

- Go through the other scripts in `package.json`

## Global state management using reduxSauce

- Global state management using [Redux Sauce](https://github.com/infinitered/reduxsauce)

  Take a look at the following files

  - [app/containers/HomeContainer/reducer.js](app/containers/HomeContainer/reducer.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

- Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)

  Take a look at the following files

  - [app/containers/HomeContainer/selectors.js](app/containers/HomeContainer/selectors.js)

## Implementing a Redux middleware using redux-sagas

- Side effects using [Redux Saga](https://github.com/redux-saga/redux-saga)

  Take a look at the following files

  - [app/containers/HomeContainer/saga.js](app/containers/HomeContainer/saga.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

## Network requests using apisauce

- API calls using [Api Sauce](https://github.com/infinitered/apisauce/)

  Take a look at the following files

  - [app/utils/apiUtils.js](app/utils/apiUtils.js)
  - [app/services/repoApi.js](app/services/repoApi.js)
  - [app/containers/HomeContainer/saga.js](app/containers/HomeContainer/saga.js)

## Styling using emotion

- Styling components using [Emotion](https://emotion.sh/)

  Take a look at the following files

  - [app/components/T/index.js](app/components/T/index.js)
  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

## Using Material UI as the component library

- Reusing components from [Material UI](https://mui.com)

  Take a look at the following files

  - [app/containers/HomeContainer/index.js](app/containers/HomeContainer/index.js)

## Localization using Lingui

- Translations using [Lingui](https://github.com/lingui/js-lingui)

  Take a look at the following files

  - [app/translations/en.json](app/translations/en.json)
  - [app/containers/LanguageProvider/](app/containers/LanguageProvider/)
  - [app/i18n](app/i18n.js)

## Routing using react-router

- Routing is done using [React Router](https://github.com/ReactTraining/react-router)

  Take a look at the following files

  - [app/routeConfig.js](app/routeConfig.js)
  - [app/containers/App/index.js](app/containers/App/index.js)

## Creating and showcasing components individually and in isolation using Storybooks

- Storybooks allows you to work on one component at a time. You can develop entire UIs without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

  - run storybook `yarn storybook`

- Take a look at the following files

  - [.storybook/webpack.config.js](.storybook/webpack.config.js)
  - [.storybook/main.js](.storybook/main.js)
  - [.storybook/preview.js](.storybook/preview.js)
  - [.storybook/reactIntl.js](.storybook/react-Intl.js)
  - [app/components/Clickable/stories/Clickable.stories.js](app/components/Clickable/stories/Clickable.stories.js)

## Accessibility testing using Storybooks a11y Addon

- Accessbility testing is done using [a11y addon](https://storybook.js.org/addons/@storybook/addon-a11y).

  Take a look at the following files

  - [.storybook/main.js](.storybook/main.js)
  - [.storybook/test-runner.js](.storybook/test-runner.js)

- Run all the accessbility tests using

  ```
  yarn test-storybook
  ```

- Run single test file by specifying path

  ```
  yarn test-storybook <path to file>
  ```

For the documentation take a look at: [Accessbility test](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)

## Bundling your application using Webpack

- We're using and configuring webpack to bundle our React application.

  Take a look at the following files

  - [internals/webpack/webpack.config.base.js](internals/webpack/webpack.config.base.js)
  - [internals/webpack/webpack.config.dev.js](internals/webpack/webpack.config.dev.js)
  - [internals/webpack/webpack.config.prod.js](internals/webpack/webpack.config.prod.js)

## Analyzing the bundle size using webpack-bundle-analyzer

- The size of the bundle is analyzed using the webpack-bundle-analyzer to make sure that the bundle is lean and optimized.

  Take a look at the following files

  - [internals/webpack/webpack.dev.babel.js](internals/webpack/webpack.dev.babel.js)

## Implementing CI/CD pipelines using Github Actions

- CI/CD using Github Actions.
  The CI pipeline has the following phases

  - Checkout
  - Install dependencies
  - Lint
  - Test
  - Accessbility Test
  - Build

  The CD pipeline has the following phases

  - Checkout
  - Install dependencies
  - Build
  - Deploy

  Take a look at the following files

  - [.github/workflows/ci.yml](.github/workflows/ci.yml)
  - [.github/workflows/cd.yml](.github/workflows/cd.yml)

## Testing using @testing-library/react

- Testing is done using the @testing-library/react.

  Take a look at the following files

  - [jest.config.js](jest.config.js)
  - [jest.setup.js](jest.setup.js)
  - [app/containers/HomeContainer/tests](app/containers/HomeContainer/tests)
  - [app/services/tests/repoApi.test.js](app/services/tests/repoApi.test.js)
  - [app/components/T/tests/index.test.js](app/components/T/tests/index.test.js)

## End to End testing using playwright

- End to End testing is done using [playwright](https://github.com/microsoft/playwright).

  Take a look at the following files

  - [playwright.config.js](playwright.config.js)
  - [\_\_tests\_\_/example.spec.js](__tests__/example.spec.js)

- Run all End to End tests using

  ```
  yarn test:e2e
  ```

- Run single test file by specifying path

  ```
  yarn test:e2e <path to file>
  ```

For the documentation take a look at: [playwright](https://playwright.dev/docs/intro)

## Scaffolding components/containers/tests using react-floki

- Components, containers, tests and stories can be scaffolded using
  ```
  yarn generate
  ```
  For the documentation take a look at: [react-floki](https://github.com/wednesday-solutions/react-floki)

## Misc

### Aliasing

- @app -> app/
- @containers -> app/containers/
- @components -> app/components/
- @services -> app/services/
- @utils -> app/utils/

Take a look at the following files

- [internals/webpack/webpack.base.babel.js](internals/webpack/webpack.base.babel.js)

### Chunkify and Lazy loading

Take a look at the following files

- [app/containers/HomeContainer/Loadable.js](app/containers/HomeContainer/Loadable.js)
- [app/utils/loadable.js](app/utils/loadable.js)

### App entry point

- [app/app.js](app/app.js)

### PWA

- [Offline Plugin](https://github.com/NekR/offline-plugin)
- [Webpack PWA Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)

Take a look at the following files

- [app/app.js](app/app.js)
- [internals/webpack/webpack.config.prod.js](internals/webpack/webpack.config.prod.js)
