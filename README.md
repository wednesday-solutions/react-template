<img align="left" src="https://github.com/wednesday-solutions/serverless/blob/master/serverless_github.svg" width="480" height="460" />

<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" align="left" style="margin-left: 0;">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg">
  </a>
  <p>
    <h1 align="left">React Template
    </h1>
  </p>

  <p>
An enterprise react template application showcasing - Testing strategies, Global state management, middleware support, a network layer, component library integration, localization, PWA support, route configuration, lazy loading, and Continuous integration & deployment.
  </p>

  ___


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

  ___

  <span>We’re always looking for people who value their work, so come and join us. <a href="https://www.wednesday.is/hiring">We are hiring!</a></span>
</div>

# Node Express GraphQL Template

![Node Express GraphQL Template CI](https://github.com/wednesday-solutions/node-express-graphql-template/workflows/Node%20Express%20GraphQL%20Template%20CI/badge.svg)

## A relay compliant server built using
- Node
- Express
- Postgres
- GraphQL
- Docker

## Setup

### Setup and run locally using 

```
./setup-local.sh
```

### Build and run docker container locally

```
docker-compose down
docker-compose build
docker-compose up
```

### Develop locally

```
yarn start:local
```

### Start dev server

```
yarn dev
```

### Start prod server

```
yarn prod
```

### Build the application

```
yarn build
```


# Node.js Hapi Template

![Nodejs Hapi Template](https://github.com/wednesday-solutions/node-js-hapi-template/workflows/Nodejs%20Hapi%20Template/badge.svg)

## Out of the box support for

- Dockerization
- Authorization middleware
- Redis Cache
- Rate Limited endpoints
- Paginated endpoints
- Swagger UI
- Support for directory based routing
- Simplified support for migrations and seeders using sequelize
- DAO layer for all database interactions
- Tests using jest

## Setup and Configuration. 

### Pre-requisites

* node
* docker
* docker-compose
* mysql

### Installation

* Install dependencies using npm

    - ```npm install```


### Setup
 
- Run ``` ./setup-local.sh ```
- This will seed the data in mysql and run the server. 


### Auto Generate models from database

- Automatically generate bare sequelize models from your database.
`https://github.com/sequelize/sequelize-auto`

Example:
`sequelize-auto -o "./models" -d temp_dev -h localhost -u root -p 3306 -x password -e mysql`


### Sequelize 
[Sequelize](https://sequelize.readthedocs.io/en/latest/) is a promise-based ORM for Node.js. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.

Install Sequelize:

- `npm install -g sequelize-cli`

Full documentation: https://sequelize.readthedocs.io/en/latest/


### MySQL Setup

Install MySQL

- `brew install mysql`

- This helps in accessing the database(`temp_dev`)

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`;

To Access mysql
- `mysql -uroot -p` 
- This will ask for password and the altered password is `password`

- Start Server
`mysql.server start`

- Stop Server
`mysql.server stop`


### Migrations
With migrations you can transfer your existing database into another state and vice-versa.

**Setting up Sequelize Migrations for a initial database**

Steps

1. Create a `resources` folder
2. Create individual `.sql` files for each table and add it sequentially, by prefixing by 01,02 & so on.
3. Each file should contain the proper sql syntax. 
4. Point the migration files to `/resources/v1`
5. Run `npx sequlize db:migrate`

**Structure with example**

```
    /
        migrations/
            20191014145811-initial-migration.js
        resources/
            v1/
                01_create_school.sql
                02_create_student.sql
```
    
**Database State Changes**

1. Create a migration file that prefixes with the timestamp add it in the `/migrations` folder. Ex: `20191014145811-alter-student.js`
2. Add the .sql file in the `/resources/v2` 
3. Point the new migration file to `/resources/v2`
4. Run `npx sequlize db:migarte --name migartions/20191014145811-alter-student.js`

**Structure**
 
```
    /
        migrations/
            20191015143811-initial-migration.js
            20191014145811-alter-student.js
        resources/
            v1/
                01_create_school.sql
                02_create_student.sql
            v2/
                03_alter_student.sql    

```


# react-floki

## Generate new components, containers and tests for existing and new react components

## Installation

### Globally install react-generate

`npm install -g react-floki`

**OR**

`yarn global add react-floki`

## Examples of generated files

- [Container](generated-files/container)
- [Component](generated-files/component)
- [Loadable](generated-files/loadable)
- [InjectSaga utils](generated-files/inject-saga)
- [Test-util](generated-files/test-util)

## Generating containers with tests and stories

![](screenshots/gcon.png)

## Generate components with tests and stories

![](screenshots/gcom.png)

## Documentation

### Help

To get a list of commands and usage hints use

```
react-generate --help
```

### Creating a new React Application

```
react-generate init movie-rating
```

### Generating tests for all existing components and containers

**Creating a test for a container or component:** `react-generate gt`

**Creating a test for an existing component:** `react-generate gtcom`

**Creating a test for an existing container:** `react-generate gtcon`

### Forcefully generating tests for all existing components and containers

**Forcefully creating a test for a container or component:** `react-generate gtf`

**Forcefully creating a test for an existing component:** `react-generate gtcomf`

**Forcefully creating a test for an existing container:** `react-generate gtconf`

### Generating components and containers

**Creating a container or component:** `react-generate g`

**Creating a component:** `react-generate gcom`

**Creating a container:** `react-generate gcon`

### Forcefully generating components and containers

**Forcefully creating a container or component:** `react-generate gf`

**Forcefully creating a component:** `react-generate gcomf`

**Forcefully creating a container:** `react-generate gconf`

### Generating tests for all existing components and containers

**Generate test for all components in directory:** `react-generate --all component <path-to-components>`

**Generate test for all containers in directory:** `react-generate --all containers <path-to-containers>`

### Generating a testUtils file with some utility functions for tests

**Generate a test util file:** `react-generate gtutil`

### Generating a utility for a loadable file using React 16 lazy and Suspense

**Generating a utility for a loadable file :** `react-generate gloadable`

# Advanced

## Example Usages

**Creating a test by specifying type, path and name:** `react-generate gt component src/app Button`

**Creating a test for an existing component by specifying path and name:** `react-generate gtcom src/app Button`

**Creating a test for an existing container by specifying path and name:** `react-generate gtcon src/app HomePage`

**Creating a component/container by specifying type, path and name:** `react-generate g component src/app Button`

**Creating a component by specifying path and name:** `react-generate gcom src/app Button`

**Creating a container by specifying path and name:** `react-generate gcon src/app HomePage`

**Generate test for all components in directory:** `react-generate --all component src/app/components`

**Generate test for all containers in directory:** `react-generate --all container src/app/containers`

# Projects using it

- [React Template](https://github.com/wednesday-solutions/react-template)


# React Template

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
