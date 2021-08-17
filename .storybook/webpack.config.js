const path = require('path');
const genBaseConfig = require('../internals/webpack/webpack.config.base');
const colors = require('../app/themes/colors');

module.exports = ({ config }) => {
  // hack cause smart knobs is not working on production
  process.env.NODE_ENV = 'development';

  config.resolve.alias = genBaseConfig(config).resolve.alias;

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': colors.secondary
            }
          }
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  });
  config.resolve.modules.push('app');
  config.resolve.extensions.push('.js', '.jsx', '.react.js');
  config.module.rules[0].use[0].options.plugins = [require.resolve('babel-plugin-react-docgen')];
  return config;
};
