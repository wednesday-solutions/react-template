module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/components/ScrollToTop/*.js',
    '!app/components/ErrorBoundary/*.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
    '!**/loadable.js',
    '!**/apiUtils.js',
    '!**/testUtils.js',
    '!**/stories/**',
    '!**/themes/index.js'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '@app(.*)$': '<rootDir>/app/$1',
    '@(containers|components|services|utils|themes)(.*)$': '<rootDir>/app/$1/$2',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each'
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: []
};
