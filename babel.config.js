module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
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
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    [
      '@emotion',
      {
        importMap: {
          '@mui/system': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/system', 'styled']
            }
          },
          '@mui/material/styles': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/material/styles', 'styled']
            }
          }
        }
      }
    ]
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
        ],
        [
          '@emotion',
          {
            autoLabel: 'never'
          }
        ]
      ]
    }
  }
};
