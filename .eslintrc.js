const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    amd: true,
    'jest/globals': true,
    commonjs: true
  },
  plugins: [
    'react',
    'redux-saga',
    'react-hooks',
    'jest',
    "github",
    "immutable",
    "sonarjs"
  ],

  extends: [
    'prettier',
    'prettier/react',
    'prettier-standard',
    'plugin:react/recommended',
    'eslint:recommended',
    "plugin:sonarjs/recommended",
    'plugin:security/recommended-legacy',
    "plugin:github/recommended"],
  rules: {
    'import/no-webpack-loader-syntax': 0,
    'react/display-name': 0,
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }],
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'prettier/prettier': ['error', prettierOptions],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*']
      }
    ],
    "max-lines-per-function": ["error", 250],
    "no-else-return": "error",
    "max-params": ["error", 3],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false,
      },
    }],
    "no-shadow": "error",
    "complexity": ["error", 5],
    "no-empty": "error",
    "import/order": ["error", { "groups": [["builtin", "external", "internal", "parent", "sibling", "index"]] }],
    "immutable/no-this": 2,
    "immutable/no-mutation": ['error', {
      exceptions: [
        {
          object: "draft"
        },
        {
          property: "propTypes"
        },
        {
          property: 'defaultProps'
        }
      ]
    }],
    "eslint-comments/no-use": 0,
    "max-lines": ["error", 350],
  },
  globals: {
    GLOBAL: false,
    it: false,
    expect: false,
    describe: false
  },
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "alias": {
        map: [
          ["@app", "./app",],
          ["@images", "./app/images",],
          ["@components", "./app/components",],
          ["@containers", "./app/containers",],
          ["@utils", "./app/utils",],
          ["@services", "./app/services",],
          ["@themes", "./app/themes",]
        ]
      }
    }
  }
};
