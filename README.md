<div align="center">
  <img src="https://github.com/wednesday-solutions/react-template/blob/master/react_template_github.svg" width="200" height="200" />
  
  # React Enterprise Template
  
  ### A comprehensive, production-ready React application template
  
  An enterprise-grade React template showcasing modern development practices including testing strategies, global state management, middleware support, network layer implementation, component library integration, internationalization, PWA capabilities, advanced routing, code splitting, and automated CI/CD pipelines.
  
  ---
  
  [![React Template CD](https://github.com/wednesday-solutions/react-template/workflows/React%20Template%20CD/badge.svg)](https://github.com/wednesday-solutions/react-template/actions)
  [![Coverage](./badges/badge-statements.svg)](./badges/badge-statements.svg)
  [![Branches](./badges/badge-branches.svg)](./badges/badge-branches.svg)
  [![Functions](./badges/badge-functions.svg)](./badges/badge-functions.svg)
  [![Lines](./badges/badge-lines.svg)](./badges/badge-lines.svg)
  
  Built with ❤️ by [Wednesday Solutions](https://www.wednesday.is/?utm_source=github&utm_medium=react_template)
  
  <a href="https://www.wednesday.is/contact-us/?utm_source=github&utm_medium=react_template" target="_blank">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88b9005f9ed382fb2a5_button_get_in_touch.svg" width="121" height="34">
  </a>
  <a href="https://github.com/wednesday-solutions/" target="_blank">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88bb1958c3253756c39_button_follow_on_github.svg" width="168" height="34">
  </a>
  
</div>

---

---

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🛠️ Getting Started](#️-getting-started)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎯 Features](#-features)
  - [🏪 Global State Management (Redux Sauce)](#-global-state-management-redux-sauce)
  - [⚡ Redux Middleware (Saga)](#-redux-middleware-saga)
  - [🌐 HTTP Client (Wretch)](#-http-client-wretch)
  - [💅 Styling (Emotion)](#-styling-emotion)
  - [🎨 UI Components (Material UI)](#-ui-components-material-ui)
  - [🌍 Internationalization (Lingui)](#-internationalization-lingui)
  - [🔀 Routing (React Router)](#-routing-react-router)
  - [📚 Component Development (Storybook)](#-component-development-storybook)
  - [♿ Accessibility Testing](#-accessibility-testing)
  - [📦 Bundling (Webpack)](#-bundling-webpack)
  - [📊 Bundle Analysis](#-bundle-analysis)
  - [🔄 CI/CD (GitHub Actions)](#-cicd-github-actions)
  - [🧪 Testing (Testing Library)](#-testing-testing-library)
  - [🎭 E2E Testing (Playwright)](#-e2e-testing-playwright)
  - [⚡ Code Generation (React Floki)](#-code-generation-react-floki)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 License](#-license)

---

## 🚀 Quick Start

Get up and running in less than 5 minutes:

```bash
# Clone the repository
git clone https://github.com/wednesday-solutions/react-template.git
cd react-template

# Install dependencies
yarn install

# Initialize the project
yarn run initialize

# Start the development server
yarn start
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running! 🎉

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v20.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v5 or higher) - Comes with Node.js
- **Yarn** (recommended) - [Installation guide](https://yarnpkg.com/getting-started/install)
- **Git** - [Download here](https://git-scm.com/)

### System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Memory**: 4GB RAM (8GB recommended)
- **Disk Space**: 2GB free space

---

## 🛠️ Getting Started

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/wednesday-solutions/react-template.git
   cd react-template
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Initialize the project**
   ```bash
   yarn run initialize
   ```
   > This script sets up your development environment and configures the project for first-time use.

4. **Start the development server**
   ```bash
   yarn start
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

Explore all available commands:

| Command | Description |
|---------|-------------|
| `yarn start` | Start development server |
| `yarn build:prod` | Create production build |
| `yarn build:dev` | Create development build |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:e2e` | Run end-to-end tests |
| `yarn storybook` | Launch Storybook |
| `yarn lint` | Run linting checks |
| `yarn generate` | Scaffold new components |

---

## 🏗️ Tech Stack

This template leverages modern technologies and best practices:

### Core Technologies
- **[React 19](https://react.dev/)** - Modern React with latest features
- **[Redux](https://redux.js.org/)** + **[Redux Sauce](https://github.com/infinitered/reduxsauce)** - Predictable state management
- **[Redux Saga](https://redux-saga.js.org/)** - Side effect management
- **[React Router](https://reactrouter.com/)** - Declarative routing

### UI & Styling
- **[Material-UI](https://mui.com/)** - React component library
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling
- **[Storybook](https://storybook.js.org/)** - Component development environment

### Development Tools
- **[Webpack](https://webpack.js.org/)** - Module bundler
- **[Babel](https://babeljs.io/)** - JavaScript compiler
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Lingui](https://lingui.js.org/)** - Internationalization

### Testing Framework
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[Testing Library](https://testing-library.com/)** - Simple testing utilities
- **[Playwright](https://playwright.dev/)** - End-to-end testing

### DevOps & CI/CD
- **[GitHub Actions](https://github.com/features/actions)** - Continuous integration
- **[AWS S3](https://aws.amazon.com/s3/)** - Static hosting
- **[CloudFront](https://aws.amazon.com/cloudfront/)** - CDN
- **[SonarQube](https://www.sonarqube.org/)** - Code quality analysis

---

## 📁 Project Structure

```
react-template/
├── 📁 app/                      # Application source code
│   ├── 📁 components/           # Reusable UI components
│   ├── 📁 containers/           # Connected components with business logic
│   ├── 📁 services/             # API services and external integrations
│   ├── 📁 utils/                # Utility functions and helpers
│   ├── 📁 translations/         # Internationalization files
│   ├── 📁 themes/               # Theme configurations
│   ├── 📄 app.js                # Application entry point
│   └── 📄 routeConfig.js        # Route configurations
├── 📁 internals/                # Build and development tools
│   ├── 📁 webpack/              # Webpack configurations
│   └── 📁 scripts/              # Build and setup scripts
├── 📁 .storybook/               # Storybook configuration
├── 📁 __tests__/                # End-to-end test files
├── 📁 .github/workflows/        # CI/CD pipeline definitions
├── 📄 package.json              # Dependencies and scripts
├── 📄 jest.config.json          # Jest testing configuration
├── 📄 playwright.config.js      # Playwright E2E configuration
└── 📄 README.md                 # You are here!
```

---

## 🎯 Features

This template includes comprehensive implementations of modern React development patterns:

### 🏪 Global State Management (Redux Sauce)

Efficient state management using Redux with Redux Sauce for cleaner action creators and reducers.

**Key Features:**
- Simplified action creator syntax
- Automatic action type generation
- Immutable state updates with Immer
- Time-travel debugging with Redux DevTools

**Implementation Files:**
- [`app/containers/HomeContainer/reducer.js`](app/containers/HomeContainer/reducer.js) - State reducers
- [`app/containers/HomeContainer/index.js`](app/containers/HomeContainer/index.js) - Container component
- [`app/containers/HomeContainer/selectors.js`](app/containers/HomeContainer/selectors.js) - Memoized selectors with Reselect

**Example Usage:**
```javascript
// Selector usage with Reselect for optimal performance
const homeSelector = createSelector(
  getHomeContainer,
  homeState => homeState
);
```

---

### ⚡ Redux Middleware (Saga)

Handle complex asynchronous operations and side effects with Redux Saga.

**Key Features:**
- Declarative effects for async operations
- Easy testing of async flows
- Cancellable operations
- Race conditions handling

**Implementation Files:**
- [`app/containers/HomeContainer/saga.js`](app/containers/HomeContainer/saga.js) - Saga effects
- [`app/containers/HomeContainer/index.js`](app/containers/HomeContainer/index.js) - Saga integration

---

### 🌐 HTTP Client (Wretch)

Modern, lightweight HTTP client for API communications.

**Key Features:**
- Promise-based API
- Request/response interceptors
- Built-in error handling
- Lightweight alternative to Axios

**Implementation Files:**
- [`app/utils/apiUtils.js`](app/utils/apiUtils.js) - API utilities and configuration
- [`app/services/repoApi.js`](app/services/repoApi.js) - API service layer
- [`app/containers/HomeContainer/saga.js`](app/containers/HomeContainer/saga.js) - API integration

---

### 💅 Styling (Emotion)

CSS-in-JS styling solution for component-based styling.

**Key Features:**
- Component-based styling
- Theme support
- Server-side rendering
- Excellent performance

**Implementation Files:**
- [`app/components/T/index.js`](app/components/T/index.js) - Styled text component
- [`app/containers/HomeContainer/index.js`](app/containers/HomeContainer/index.js) - Container styling

---

### 🎨 UI Components (Material UI)

Production-ready React components implementing Google's Material Design.

**Key Features:**
- Comprehensive component library
- Customizable theming system
- Accessibility built-in
- TypeScript support

**Implementation Files:**
- [`app/containers/HomeContainer/index.js`](app/containers/HomeContainer/index.js) - Material UI integration

---

### 🌍 Internationalization (Lingui)

Complete i18n solution supporting multiple languages and locales.

**Key Features:**
- ICU MessageFormat support
- Pluralization rules
- Number and date formatting
- Extract/compile workflow

**Implementation Files:**
- [`app/translations/en.json`](app/translations/en.json) - English translations
- [`app/containers/LanguageProvider/`](app/containers/LanguageProvider/) - Language provider setup
- [`app/i18n.js`](app/i18n.js) - i18n configuration

**Usage:**
```bash
# Extract translatable strings
yarn extract-intl

# Compile translations
yarn compile-intl
```

---

### 🔀 Routing (React Router)

Declarative routing for React applications.

**Key Features:**
- Dynamic route matching
- Nested routing
- Code splitting integration
- Browser history management

**Implementation Files:**
- [`app/routeConfig.js`](app/routeConfig.js) - Route definitions
- [`app/containers/App/index.js`](app/containers/App/index.js) - Router setup

---

### 📚 Component Development (Storybook)

Develop and showcase UI components in isolation.

**Key Features:**
- Component isolation
- Interactive props exploration
- Automated documentation
- Visual regression testing

**Setup Files:**
- [`.storybook/main.js`](.storybook/main.js) - Storybook configuration
- [`.storybook/preview.js`](.storybook/preview.js) - Global decorators and parameters
- [`app/components/Clickable/stories/`](app/components/Clickable/stories/) - Component stories

**Commands:**
```bash
# Start Storybook development server
yarn storybook

# Build static Storybook
yarn build-storybook:prod
```

---

### ♿ Accessibility Testing

Comprehensive accessibility testing using Storybook's a11y addon.

**Key Features:**
- Automated accessibility audits
- WCAG compliance checking
- Color contrast validation
- Keyboard navigation testing

**Configuration Files:**
- [`.storybook/main.js`](.storybook/main.js) - a11y addon configuration
- [`.storybook/test-runner.js`](.storybook/test-runner.js) - Test runner setup

**Commands:**
```bash
# Run accessibility tests
yarn test-storybook

# Run specific accessibility test
yarn test-storybook <path-to-story>
```

---

### 📦 Bundling (Webpack)

Advanced Webpack configuration for optimal bundling and performance.

**Key Features:**
- Code splitting and lazy loading
- Tree shaking for smaller bundles
- Hot module replacement
- Progressive Web App support

**Configuration Files:**
- [`internals/webpack/webpack.config.base.js`](internals/webpack/webpack.config.base.js) - Base configuration
- [`internals/webpack/webpack.config.dev.js`](internals/webpack/webpack.config.dev.js) - Development setup
- [`internals/webpack/webpack.config.prod.js`](internals/webpack/webpack.config.prod.js) - Production optimization

---

### 📊 Bundle Analysis

Analyze and optimize your bundle size with webpack-bundle-analyzer.

**Key Features:**
- Visual bundle composition
- Dependency size analysis
- Optimization recommendations
- Performance monitoring

**Commands:**
```bash
# Analyze bundle size
yarn analyze
```

---

### 🔄 CI/CD (GitHub Actions)

Automated continuous integration and deployment pipelines.

**CI Pipeline Features:**
- ✅ Dependency installation
- 🔍 Code linting and formatting
- 🧪 Unit and integration tests
- ♿ Accessibility testing
- 🏗️ Production build
- 📊 Lighthouse performance audit
- 🔍 SonarQube code quality analysis

**CD Pipeline Features:**
- 🚀 Automated deployment to AWS S3
- 🌐 CloudFront CDN invalidation
- 📊 Test coverage badge generation
- 🔄 Multi-environment support

**Configuration Files:**
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) - Continuous Integration
- [`.github/workflows/cd.yml`](.github/workflows/cd.yml) - Continuous Deployment

---

### 🧪 Testing (Testing Library)

Comprehensive testing setup with Jest and React Testing Library.

**Key Features:**
- Component testing utilities
- User-centric testing approach
- Snapshot testing
- Coverage reporting

**Test Files:**
- [`jest.config.json`](jest.config.json) - Jest configuration
- [`jest.setup.js`](jest.setup.js) - Test environment setup
- [`app/containers/HomeContainer/tests/`](app/containers/HomeContainer/tests/) - Container tests
- [`app/services/tests/repoApi.test.js`](app/services/tests/repoApi.test.js) - API service tests
- [`app/components/T/tests/index.test.js`](app/components/T/tests/index.test.js) - Component tests

**Commands:**
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage

# Generate coverage badges
yarn test:badges
```

---

### 🎭 E2E Testing (Playwright)

End-to-end testing with Microsoft Playwright for cross-browser testing.

**Key Features:**
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device emulation
- Network interception
- Visual regression testing

**Configuration Files:**
- [`playwright.config.js`](playwright.config.js) - Playwright configuration
- [`__tests__/example.spec.js`](__tests__/example.spec.js) - Example E2E test

**Commands:**
```bash
# Run all E2E tests
yarn test:e2e

# Run specific test file
yarn test:e2e <path-to-test-file>
```

**Learn More:** [Playwright Documentation](https://playwright.dev/docs/intro)

---

### ⚡ Code Generation (React Floki)

Scaffold components, containers, and tests with consistent patterns.

**Key Features:**
- Component generation with tests and stories
- Container scaffolding with Redux integration
- Consistent file structure
- Custom templates support

**Commands:**
```bash
# Launch interactive generator
yarn generate
```

**Learn More:** [React Floki Documentation](https://github.com/wednesday-solutions/react-floki)

---

## 🔧 Advanced Configuration

### Aliases

The project includes helpful path aliases for cleaner imports:

- `@app` → `app/`
- `@containers` → `app/containers/`
- `@components` → `app/components/`
- `@services` → `app/services/`
- `@utils` → `app/utils/`

**Configuration:** [`internals/webpack/webpack.base.babel.js`](internals/webpack/webpack.base.babel.js)

### Code Splitting & Lazy Loading

Optimize your app's performance with automatic code splitting:

**Implementation Files:**
- [`app/containers/HomeContainer/loadable.js`](app/containers/HomeContainer/loadable.js) - Loadable container
- [`app/utils/loadable.js`](app/utils/loadable.js) - Loadable utility

### Progressive Web App (PWA)

Transform your React app into a PWA with offline capabilities:

**Features:**
- Service worker integration
- Offline functionality
- App manifest generation
- Installable web app

**Configuration:**
- [`app/app.js`](app/app.js) - PWA setup
- [`internals/webpack/webpack.config.prod.js`](internals/webpack/webpack.config.prod.js) - PWA plugins

**Technologies:**
- [Offline Plugin](https://github.com/NekR/offline-plugin)
- [Webpack PWA Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)

---

## 🚀 Deployment

### Automated Deployment

The project includes automated deployment pipelines using GitHub Actions:

1. **Production Deployment** - Triggered on push to `master` branch
2. **Development Deployment** - Triggered on push to development branches

### Manual Deployment

**Build for Production:**
```bash
yarn build:prod
```

**Build for UAT:**
```bash
yarn build:uat
```

**Deploy to AWS S3:**
The built files are automatically deployed to AWS S3 with CloudFront CDN integration for optimal performance.

### Environment Configuration

Configure your deployment environments using the following files:
- `.env` - General environment variables
- `.env.development` - Development-specific variables
- `.env.local` - Local development overrides

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started with Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite**
   ```bash
   yarn test
   yarn test:e2e
   yarn lint
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Development Guidelines

- **Code Style**: Follow the existing code style enforced by ESLint and Prettier
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update documentation for any new features
- **Commit Messages**: Use conventional commit format

### Code Style

This project uses:
- **ESLint** for JavaScript linting
- **Prettier** for code formatting
- **Stylelint** for CSS linting

Run formatting and linting:
```bash
yarn lint          # Check for issues
yarn lint:js       # JavaScript linting
yarn lint:css      # CSS linting
yarn prettify      # Format code
```

---

## 🐛 Troubleshooting

### Common Issues

**🔧 Node.js Version Issues**
```bash
# Check your Node.js version
node --version

# Use nvm to install the correct version
nvm install 20
nvm use 20
```

**📦 Dependency Installation Failures**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

**🔌 Port Already in Use**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 yarn start
```

**🏗️ Build Issues**
```bash
# Clear build artifacts
yarn clean:all

# Try building again
yarn build:prod
```

**🧪 Test Issues**
```bash
# Clear Jest cache
yarn test --clearCache

# Run tests with verbose output
yarn test --verbose
```

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/wednesday-solutions/react-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/wednesday-solutions/react-template/discussions)
- **Documentation**: Check the inline code comments and linked resources

### Performance Tips

1. **Bundle Size**: Use `yarn analyze` to monitor bundle size
2. **Memory**: Increase Node.js memory if needed: `NODE_OPTIONS="--max-old-space-size=4096"`
3. **Development**: Use `yarn start` for hot reloading during development

---

## 📚 Additional Resources

### Learning Resources
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [Testing Library Documentation](https://testing-library.com/)
- [Storybook Documentation](https://storybook.js.org/)

### Best Practices
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Redux Style Guide](https://redux.js.org/style-guide)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 👥 About Wednesday Solutions

**Wednesday Solutions** is a digital product engineering company that focuses on creating scalable, maintainable solutions using modern technologies.

### Our Services
- 🔧 **Custom Software Development**
- 🎨 **UI/UX Design**
- 📱 **Mobile App Development**
- ☁️ **Cloud Architecture**
- 🔒 **DevOps & Security**

### Connect With Us
- 🌐 **Website**: [wednesday.is](https://www.wednesday.is/)
- 💼 **LinkedIn**: [Wednesday Solutions](https://www.linkedin.com/company/wednesday-solutions/)
- 🐦 **Twitter**: [@WednesdaySol](https://twitter.com/WednesdaySol)
- 📧 **Email**: [hello@wednesday.is](mailto:hello@wednesday.is)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Wednesday Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

Built with ❤️ by [Wednesday Solutions](https://www.wednesday.is/?utm_source=github&utm_medium=react_template)

*Happy Coding! 🚀*

</div>
