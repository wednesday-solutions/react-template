module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 15,
      functions: 15,
      lines: 15
    }
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '@app(.*)$': '<rootDir>/app/$1',
    '@(containers|components|services|utils)(.*)$': '<rootDir>/app/$1/$2',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each'
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: []
}
