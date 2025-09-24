const path = require('path');
const colors = require('../app/themes/colors');

module.exports = ({ config }) => {
  // hack cause smart knobs is not working on production
  process.env.NODE_ENV = 'development';

  // Set up basic aliases without importing the base config that has image optimization
  config.resolve.alias = {
    ...config.resolve.alias,
    '@app': path.resolve(__dirname, '../app'),
    '@components': path.resolve(__dirname, '../app/components'),
    '@containers': path.resolve(__dirname, '../app/containers'),
    '@services': path.resolve(__dirname, '../app/services'),
    '@utils': path.resolve(__dirname, '../app/utils'),
    '@themes': path.resolve(__dirname, '../app/themes'),
    '@images': path.resolve(__dirname, '../app/images'),
  };

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
