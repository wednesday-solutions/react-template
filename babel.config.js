module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 0.25%, not dead']
        },
        modules: false,
        corejs: '3.6.5',
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'lodash',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-optional-chaining',
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        ['import', { libraryName: 'antd', style: true }, 'import-antd'],
        ['import', { libraryName: 'lodash' }, 'import-lodash']
      ]
    },
    dev: {
      plugins: [
        ['import', { libraryName: 'antd', style: true }],
        ['import', { libraryName: 'lodash' }, 'import-lodash']
      ]
    },
    development: {
      plugins: [
        ['import', { libraryName: 'antd', style: true }],
        ['import', { libraryName: 'lodash' }, 'import-lodash']
      ]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
        ['import', { libraryName: 'antd', style: true }],
        ['import', { libraryName: 'lodash' }, 'import-lodash']
      ]
    }
  }
};
