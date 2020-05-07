const path = require('path');
const genBaseConfig = require('../internals/webpack/webpack.base.babel.js');
module.exports = ({ config }) => {
  // hack cause smart knobs is not working on production
  process.env.NODE_ENV = 'development';

  config.resolve.alias = genBaseConfig(config).resolve.alias;

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader' // creates style nodes from JS strings
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {}
          }
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  });
  config.resolve.modules.push('app');
  config.resolve.extensions.push('.js', '.jsx', '.react.js');
  return config;
};
