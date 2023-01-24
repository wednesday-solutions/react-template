module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
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
        [
          'transform-react-remove-prop-types',
          {
            // Removes the import statements for React propTypes
            removeImport: true
          }
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'core'
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ],
        ['import', { libraryName: 'lodash' }, 'import-lodash']
      ]
    },
    dev: {
      plugins: [
        [
          'import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: '',
            camel2DashComponentName: false
          }
        ],
        [
          ('babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons')
        ]
      ]
    },
    development: {
      plugins: [
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'core'
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ]
      ]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
        [
          'import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: '',
            camel2DashComponentName: false
          }
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ]
      ]
    }
  }
};
